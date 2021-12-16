const express = require('express');
const router = express.Router();

const controller = require('./productsController');


router.get('/search', controller.search);

router.get('/detail', controller.product_detail);

router.post('/rate', controller.rate);

router.get('/:id/ratings', controller.getRatings);

router.get('/', controller.list);
module.exports = router;
