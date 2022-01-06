const Order = require('../../models/Order');
const cartService = require('../cart/cartService');

module.exports = {
    add_order: async (userId,shippingAddress,cartId,totalPrice) => {
        const targetCart = await cartService.getCartById(cartId);
        const newOrder = new Order({
            user_id: userId,
            shippingAddress,
            items: targetCart.items,
            totalPrice
        });
        const check = newOrder.save();
        if (check)
            cartService.removeCart(cartId);
        return check;
    },

    list: async(userId)=>{
        return await Order.find({user_id: userId}).exec();
    },

    detail: async(orderId)=>{
        return await Order.findById(orderId)
                          .populate('user_id')
                          .populate('items.itemId');
    },

    cancelOrder: (orderId)=>{
        return Order.findByIdAndUpdate(orderId,{status: 'cancel'});
    }
}