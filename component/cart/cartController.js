const services=require('./cartService');

module.exports={
    cart: async(req,res)=>{
        res.render('./default/index', { title: 'Cart' ,body: '../order/cart'});
    }
};
