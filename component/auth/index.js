const express = require('express');
const router = express.Router();
const loginController = require('./login');
const signupController = require('./signup');
const forgotPwController = require('./forgotpassword');
const infoController = require('./info');
const passport = require('../../auth/passport');

router.use("/login", loginController);
router.use("/signup", signupController);
router.use("/forgotpw", forgotPwController);
router.use("/info", infoController);
router.use("/", 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
    }),
);

module.exports=router;