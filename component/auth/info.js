const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('./auth/info', {title: "User Info"});
})

module.exports = router;