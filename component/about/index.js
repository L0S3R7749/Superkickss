const express = require('express');
const router = express.Router();

const controller = require('./aboutController');

router.get('/',controller.about);

module.exports = router;
