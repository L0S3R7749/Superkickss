const indexRouter = require('./homepage');
const aboutRouter = require('./about');
const authRouter = require('./auth');
const contactRouter = require('./contact');
const shopRouter = require('./product');
const orderRouter = require('./order');
const cartRouter = require('./cart');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.use('/about', aboutRouter);
router.use('/auth', authRouter);
router.use('/contact', contactRouter);
router.use('/product', shopRouter);
router.use('/order', orderRouter);
router.use('/cart',cartRouter);
router.use('/', indexRouter);

module.exports = router;