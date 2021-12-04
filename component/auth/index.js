const express = require('express');
const router = express.Router();
const loginController = require('./login');
const signupController = require('./signup');
const forgotPwController = require('./forgotpassword');
const infoController = require('./info');

router.use("/login", loginController);
router.use("/signup", signupController);
router.use("/forgotpw", forgotPwController);
router.use("/info", infoController);

router.get('/logout', function(req,res) {
    req.logOut();
    res.redirect('/');
})

module.exports=router;