const express = require('express');
const router = express.Router();

const checkAuth = require('../../auth/check-auth');
const controller = require('./cartController');

router.post('/add',checkAuth.checkAuthentication,controller.add);

router.post('/remove',controller.remove);

router.post('/update',controller.update);

router.get('/getSingle/:id', controller.getCartById);

router.get('/',checkAuth.checkAuthentication,controller.cart);

module.exports = router;
