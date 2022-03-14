// Imports and constants
const mongoose = require('mongoose');
const collection = "notes";

// Notes Schema
const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    important: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    }
});

// Notes model
const notesModel = mongoose.model('notesModel', noteSchema, collection);

module.exports = {notesModel, noteSchema};