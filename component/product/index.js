const express = require('express');
const router = express.Router();

const controller = require('./productsController');

/* GET home page. */
router.use('/', controller);

module.exports = router;
