const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');
let employeSchema = new mongoose.Schema({

    firstName:{
        type:String,
         required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

employeSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 13);
        next();
    } catch (e) {
        next(e);
    }
});
employeSchema.methods.comparePasswords = async function (passwordSent, next) {
    try {
        return await bcrypt.compare(passwordSent, this.password);
    } catch (e) {
        next(e);
    }
};
employeSchema.methods.insertToken = function () {
    let user = this.toObject();
    delete user.password;
    user.token = jwt.sign(
        {
            id: user._id,
            userName: user.userName,
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "100h",
        }
    );
    return user;
};
module.exports = mongoose.model('employe',employeSchema);