const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    expire_at:{
        type: Date,
        default: Date.now,
        expires: 600,
    },
});

module.exports = mongoose.model("Token",tokenSchema);
