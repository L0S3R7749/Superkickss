const services = require('./orderServices');

module.exports = {
  checkout: (req,res,next)=>{
    res.render('./default/index', { title: 'Checkout' ,body: '../order/checkout'});
  }
}