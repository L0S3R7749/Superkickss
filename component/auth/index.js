const express = require('express');
const router = express.Router();
const loginController = require('./login');
const signupController = require('./signup');
const forgotPwController = require('./forgotpassword');

router.use("/login", loginController);
router.use("/signup", signupController);
router.use("/forgotpw", forgotPwController);

module.exports=router;