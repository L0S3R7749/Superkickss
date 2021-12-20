const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    items: [
        {
            itemId:{
                type: mongoose.Schema.Types.ObjectId, ref: "Product",
                required: true,
            },
            itemSize:{
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0,
                max: 999999,
            },
        },
    ],
});

module.exports = mongoose.model("Cart",cartSchema);
