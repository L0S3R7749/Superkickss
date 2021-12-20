const express = require('express');
const router = express.Router();

const checkAuth = require('../../auth/check-auth');
const controller = require('./cartController');

router.post('/add',checkAuth.checkAuthentication,controller.add);

router.get('/',checkAuth.checkAuthentication,controller.cart);

module.exports = router;
