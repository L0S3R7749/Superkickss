const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./default/index', { title: 'Signup', body: '../auth/signup'});
});

module.exports = router;
