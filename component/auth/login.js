const passport = require('../../auth/passport');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./default/index', {title: 'Login', body: '../auth/login', message: req.flash('error')});
});

router.post("/", 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }),
);

module.exports = router;
