const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.render('./default/index',{title: 'Contact',
    body:'../../views/contact/contact',});
});

module.exports = router;