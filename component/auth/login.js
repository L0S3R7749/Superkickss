const passport = require('../../auth/passport');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./default/index', {title: 'Login', body: '../auth/login'});
});

router.post("/", 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
    }),
);

module.exports = router;
