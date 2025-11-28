const express = require('express');
const dotenv = require('dotenv');

const {login} = require("../controller/usercontroller")
const {register} = require("../controller/usercontroller")
const {auth,adminOnly} = require("../middleware/auth")

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/profile", auth, (req, res) => {
    res.send("User Profile Access Granted");
});


router.get("/admin-dashboard", auth, adminOnly, (req, res) => {
    res.send("Welcome Admin!");
});


module.exports = router;
