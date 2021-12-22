const express = require('express');
const router = express.Router();
const controller = require('./orderController');
const ty = require('./thankyou');
const checkAuth = require('../../auth/check-auth');

router.get('/checkout', controller.checkout);

router.post('/checkout', controller.create_order);

router.use('/thankyou', checkAuth.checkAuthentication, ty);

// router.get('/', controller);

module.exports = router;
