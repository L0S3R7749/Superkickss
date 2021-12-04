const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./auth/login', { body: '../auth/login'});
});

module.exports = router;
