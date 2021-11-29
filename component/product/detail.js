var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./default/index', { title: 'Product Detail' ,body: '../products/detail'});
});

module.exports = router;
