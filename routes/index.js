var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '', header: 'default/header', body: 'home', footer: 'default/footer'});
});

module.exports = router;
