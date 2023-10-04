const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('authorModel', AuthorSchema, 'authors')