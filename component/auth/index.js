const express = require('express');
const router = express.Router();
const passport = require('../../auth/passport');
const controller = require('./authController');
const checkAuth = require('../../auth/check-auth');


router.get('/login', controller.getLogin);

router.post('/login', 
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/info',checkAuth.checkAuthentication, controller.info);

router.get('/forgot-password', controller.viewForgotPassword);

router.post('/forgot-password', controller.forgotPassword);

router.get('/reset-password', controller.viewResetPassword);

router.post('/reset-password', controller.resetPassword);

router.get('/change-password',checkAuth.checkAuthentication, controller.viewChangePassword);

router.post('/change-password',checkAuth.checkAuthentication, controller.changePassword);

router.get('/signup', controller.getSignup);

router.post('/signup', controller.postSignup);

router.get('/verify', controller.verify);

router.get('/logout', controller.logout);

router.get('/');

module.exports=router;
