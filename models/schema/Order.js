const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: {
      type: Number,
      required: true,
    },
    user: {
      _id: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      shippingAddress: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["not checkout", "in progress", "shipping", "completed"],
      default: "not checkout",
    },
    creaetedDate: {
      type: Date,
      default: Date.now,
    },
    acceptedDate: {
      type: Date,
    },
    deliveryDate: {
      type: Date,
    },
    compeletedDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
    },
    items: [
      {
        itemId: {
          type: String,
          required: true,
        },
        itemName: {
          type: String,
          required: true,
        },
        itemSize: {
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
  },
  { timestamp: true }
);

module.exports = mongoose.model("Order", orderSchema);
