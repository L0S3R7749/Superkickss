const services = require('./cartService');

module.exports = {
    cart: async (req, res, next) => {
        let user_id = req.user._id;
        try {
            let cart = await services.getCart(user_id);
            if (!cart || cart.items.length === 0) {
                res.render('./default/index', {
                    title: 'Cart',
                    body: '../cart/emptyCart',
                });
            } else {
                let total = 0;
                for (let i = 0; i < cart.items.length; i++) {
                    total += cart.items[i].itemId.price * cart.items[i].quantity;
                }
                res.render('./default/index', {
                    title: 'Cart',
                    body: '../cart/cart',
                    cart: cart,
                    total: total,
                });
            }
        } catch (err) {
            next(err);
        }
    },

    add: async (req, res, next) => {
        let userId = req.body.userId;
        let itemId = req.body.itemId;
        let itemSize = req.body.itemSize;
        let itemQuantity = req.body.itemQuantity;

        try {
            const addCart = await services.addCart(userId, itemId, itemSize, itemQuantity);
            if (!addCart) {
                res.status(400).send({
                    message: `Can't add to cart`
                });
            } else {
                res.status(200).send(addCart);
                return addCart;
            }
        } catch (err) {
            next(err);
        }
    },

    remove: async (req, res, next) => {
        let user_id = req.body.userId;
        let itemId = req.body.productId;
        let itemSize = parseInt(req.body.productSize);
        let cart = await services.remove(user_id, itemId, itemSize);
        console.log(cart);
        if (!cart) {
            res.status(500).send({
                message: 'Error'
            });
        } else {
            res.status(201).send(cart);
        }
    },

    update: async (req, res, next) => {
        let user_id = req.body.userId;
        let itemId = req.body['id[]'];
        let itemSize = req.body['size[]'];
        let quantity = req.body['quantity[]'];
        let items = [];
        let n = (typeof (itemId) === 'string') ? 1 : itemId.length;
        if (n != 1) {
            for (let i = 0; i < n; i++) {
                itemSize[i] = parseInt(itemSize[i]);
                quantity[i] = parseInt(quantity[i]);
                items.push({
                    itemId: itemId[i],
                    itemSize: itemSize[i],
                    quantity: quantity[i],
                })
            }
        } else {
            items.push({
                itemId,
                itemSize,
                quantity
            });
        }
        const cart = await services.update(user_id, items);
        if (!cart) {
            res.status(500).send({
                message: 'Error'
            });
        } else {
            res.status(201).send(cart);
        }
    },

    getCartById: async (req, res, next) => {
        let cartId = req.params.id;
        const cart = await services.getCartById(cartId);
        if (!cart)
            res.status(500).send({
                message: 'error'
            });
        else{
            res.status(200).send(cart);
        }
    }
};