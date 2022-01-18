const Employe = require("../models/employe");
module.exports = {
    createUser: async (req, res) => {
        let admin = false;
       if(req.body.isAdmin === 'on'){
            admin = true
        }
        const { firstName, lastName, userName, password } = req.body;
        try {
            const user = await Employe.create({ firstName, lastName, userName, password, admin });
            res.cookie("token", user.insertToken().token, { expire: 360000 + Date.now() });
            res.redirect("/");
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    logUser: async (req, res) => {
        const { userName, password } = req.body;
        try {
            let user = await Employe.findOne({ userName });
            if (!user) throw new Error("We didn't find any user with this username : " + userName);
            if (!(await user.comparePasswords(password)))
                throw Error("Wrong Password,Try again !!");
            res.cookie("token", user.insertToken().token, {
                expires: new Date(360000000 + Date.now()),
            });
            res.redirect("/");
        } catch (e) {
            res.send(e.message);
        }
    },
    showUser: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await Employe.findById(id).select({ passwords: 0 }); //.select( "-passwords" );
            res.json(user);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateUser: async (req, res) => {
        const { firstName, lastName, password } = req.body,
            id = req.params.id;
        try {
            if (!req.employe._id.equals(id))
                throw new Error("You aren't allowed to edit other users profiles.");
            const u = await Employe.findById(id);
            u.firstName = firstName ? firstName : u.firstName;
            u.lastName = lastName ? lastName : u.lastName;
            u.password = password ? password : u.password;
            await u.save();
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    userToAdmin: async (req, res) => {
        const id = req.params.id;
        try {
            const u = await Employe.findById(id);
            u.isAdmin = true;
            await u.save();
            res.status(201).send(u);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
};