const express = require("express"),
    { isLoggedIn, isAdmin } = require("../middlewares/auth"),
    { showUser, updateUser, userToAdmin } = require("../middlewares/employe");
router = express.Router();
// /users

router.route("/:id").get(showUser).put(isLoggedIn, updateUser);
router.route("/:id/toAdmin").put(isLoggedIn, isAdmin, userToAdmin);
module.exports = router;