const express = require('express');
const router = express.Router();

const controller = require('./homepageController');

router.get('/',controller.home);

module.exports = router;
