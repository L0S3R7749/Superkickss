const express = require('express');
const router = express.Router();
const controller = require('./orderController');

router.get('/checkout', controller.checkout);

router.post('/checkout', controller.create_order);

router.get('/thankyou', controller.thankyou);

router.get('/detail/:id', controller.detail);

router.get('/', controller.list);

module.exports = router;
