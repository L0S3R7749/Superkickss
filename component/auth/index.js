const express = require('express');
const router = express.Router();
const passport = require('../../auth/passport');
const controller = require('./authController');

router.get('/login', controller.getLogin);
router.post('/login', 
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));
router.get('/info', controller.info);
router.get('/forgotpw', controller.forgotPassword);
router.get('/changepw', controller.changePassword);
router.get('/signup', controller.getSignup);
router.post('signup', controller.postSignup);
router.get('/logout', controller.logout);

router.get('/');

module.exports=router;
