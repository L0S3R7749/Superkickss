const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('./default/index',{title: 'User info',body: '../auth/info'})
})

module.exports = router;