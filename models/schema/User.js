const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    }, 
    addresses: [{
        address: {
            type: String,
            required: true,
        }
    }],
    userRight: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

module.exports = mongoose.model("User", userSchema);
