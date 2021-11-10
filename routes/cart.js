var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' ,body: 'cart'});
});

router.get('/checkout',function(req,res,next){
    res.render('index',{title:'',body: 'checkout'})
})

module.exports = router;
