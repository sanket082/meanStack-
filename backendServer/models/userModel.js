// Imports and constants
const mongoose = require('mongoose');
const collection = "users";

// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    tokenTime: {
        type: Date
    }
});

// User model
const userModel = mongoose.model('userModel', userSchema, collection);

module.exports = userModel