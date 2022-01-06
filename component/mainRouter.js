const indexRouter = require('./homepage');
const siteRouter = require('./site');
const authRouter = require('./auth');
const shopRouter = require('./product');
const orderRouter = require('./order');
const cartRouter = require('./cart');
const checkAuth = require('../middleware/check-auth');

const express = require('express');
const router = express.Router();

router.use('/site',siteRouter);
router.use('/auth', authRouter);
router.use('/product', shopRouter);
router.use('/order',checkAuth.checkAuthentication, orderRouter);
router.use('/cart',checkAuth.checkAuthentication, cartRouter);
router.use('/', indexRouter);

module.exports = router;