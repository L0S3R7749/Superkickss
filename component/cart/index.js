const express = require('express');
const router = express.Router();

const controller = require('./cartController');

router.post('/add',controller.add);

router.post('/remove',controller.remove);

router.post('/update',controller.update);

router.get('/getSingle/:id', controller.getCartById);

router.get('/', controller.cart);

module.exports = router;
