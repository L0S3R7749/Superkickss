const services = require('./orderServices');
const cartService = require('../cart/cartService');

module.exports = {
  list: (req,res,next)=>{
    res.render('./default/index', { title: 'Order list', body: '../order/list'});
  },
  checkout: async (req,res,next)=>{
    console.log(res.locals.user);
    const targetCart = await cartService.getCartForOrder(res.locals.user._id);
    let totalPrice = 0;
    for (let i = 0; i < targetCart.items.length; i++) {
      totalPrice += targetCart.items[i].itemId.price * targetCart.items[i].quantity;
    }
    res.render('./default/index', { 
      title: 'Checkout',
      body: '../order/checkout',
      cart: targetCart,
      total: totalPrice,
    });
  },

  create_order: async (req,res,next) => {
    try {
      const {
        cartId,
        shippingAddress,
        totalPrice,
      } = req.body;
      const newOrder = await services.add_order(res.locals.user._id, shippingAddress, cartId, totalPrice);
      if (newOrder) {
        await cartService.removeCart(cartId);
        res.status(201).send(newOrder);
      }
      else
        res.status(500).send({message: "Error create new Order"});
    } catch(err) {
      console.log(err.message);
    }
  },

  thankyou: (req,res,next)=>{
    res.render('./default/index', { title: 'Thankyou', body: '../order/thankyou'});
  },
}