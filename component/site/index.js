const express = require('express');
const router = express.Router();
const controller = require('./siteController');

router.get('/about',controller.about);
router.get('/contact',controller.contact);
router.post('/contact',controller.sendContact);

module.exports = router;
