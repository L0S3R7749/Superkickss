const express = require('express');
const router = express.Router();

const checkAuth = require('../../auth/check-auth');
const controller = require('./cartController');

router.get('/',checkAuth.checkAuthentication,controller.cart);

module.exports = router;
