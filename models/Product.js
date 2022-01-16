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
    max: 999999999
  },
  rate: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 5.0
  },
  description: {
    type: String,
    required: true,
  }, 
  SKU: {
    type: String,
    required: true,
  },
  details: [{
    size: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 999999,
    }
  }],
  images: [{
    url: {
        type: String,
        required: true,
    },
    cloudinary_id: {
        type: String,
    }
  }],
  category: {
    gender: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        required: true
    }
  },
  tags: [{
    name: {
        type: String,
        required: true,
    },
  }],
  comments: [{
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 5,
    },
    content: {
        type: String,
        require: true,
        default: '',
    },
    createdTime: {
        type: Date,
        required: true,
        default: Date.now,
    }
  }]
});

module.exports = mongoose.model("Product", productSchema);
