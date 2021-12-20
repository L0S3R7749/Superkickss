const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["in progress", "shipping", "completed"],
      default: "in progress",
    },
    createdDate: {
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
          type: mongoose.Schema.Types.ObjectId, ref: "Product",
          required: true,
        },
        itemSize: {
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
  },
  { timestamp: true }
);

module.exports = mongoose.model("Order", orderSchema);
