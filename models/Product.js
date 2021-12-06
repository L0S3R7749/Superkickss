const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999,
  },
  description: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
  },
  details: [
    {
      size: {
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
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      priority: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: true,
  },
  tags: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  comments: [
    {
      userId: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      createdTime: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
