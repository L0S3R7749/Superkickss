const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./default/index', { title: 'Cart' ,body: '../order/cart'});
});

router.get('/checkout',function(req,res,next){
  res.render('./default/index',{title:'Check Out',body: '../order/checkout'})
})

module.exports = router;
