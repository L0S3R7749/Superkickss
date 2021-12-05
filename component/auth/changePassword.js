const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('./default/index',{title: 'Change password',body: '../auth/changepassword'})
})

module.exports = router;