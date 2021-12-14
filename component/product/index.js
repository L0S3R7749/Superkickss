const express = require('express');
const router = express.Router();

const controller = require('./productsController');

router.get('/', controller.list);

router.get('/search', controller.search);

router.get('/detail', controller.product_detail);

module.exports = router;
