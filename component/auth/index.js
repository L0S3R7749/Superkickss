const express = require('express');
const router = express.Router();
const loginController = require('./login');
const signupController = require('./signup');
const forgotPwController = require('./forgotpassword');
const infoController = require('./info');
const changePasswordController = require('./changePassword');

router.use("/login", loginController);
router.use("/signup", signupController);
router.use("/forgotpw", forgotPwController);
router.use("/info", infoController);
router.use("/changepw",changePasswordController)

router.get('/logout', function(req,res) {
    req.logOut();
    res.redirect('/');
})

module.exports=router;