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
    }
}