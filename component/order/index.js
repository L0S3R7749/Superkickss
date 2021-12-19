const express = require('express');
const router = express.Router();
const controller = require('./orderController');

router.use('/', controller);

module.exports = router;