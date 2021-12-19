const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        userId: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        }
    },
    items: [
        {
            itemId:{
                type: String,
                required: true,
            },
            itemName:{
                type: String,
                required: true,
            },
            itemSize:{
                type: Number,
                required: true,
            },
            itemThumbnail: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
                max: 999999999,
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
