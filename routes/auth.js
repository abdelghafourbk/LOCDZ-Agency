const express = require("express"),
    { createUser, logUser } = require("../middlewares/employe"),
    { logPage, logOut, signedUp } = require("../middlewares/auth");
router = express.Router();
router.route("/signup").get(signedUp).post(createUser);
router.route("/login").get(logPage).post(logUser);
router.route("/logout").get(logOut);
module.exports = router;