module.exports = {
    logPage: (req, res) => {
        if (req.employe) return res.redirect("/");
        res.render("login",{title: 'login'});
    },
    signedUp: async(req, res) => {
        if (req.employe) return await res.redirect("/");
        res.render("signup",{title: 'signup'});
    },
    logOut: (req, res) => {
        res.clearCookie("token");
        res.redirect("/login");
    },
    isLoggedIn: async (req, res, next) => {
        if (req.employe) return next();
        else return res.status(401).send(req.AuthError);
    },
    isAdmin: async function (req, res, next) {
        if (!req.employe.isAdmin) return res.status(403).send("employe is not an Admin");
        next();
    },
};