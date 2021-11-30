const express = require('express');
const router = express.Router();
const controller = require('./orderController');
const cartController = require('./cart');

router.use('/', controller);
router.use('/cart', cartController);

module.exports = router;