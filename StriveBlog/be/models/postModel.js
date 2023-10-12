const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({

    category: {
      type: String,
    },

    title: {
        type: String,
    },
    cover: {
        type: String,
    },
    readTime: {
        value: {
            type: Number,
        },
        unit:{
            type: String,
        },
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'authorModel'
    },
    content: {
        type: String,
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('postModel', PostSchema, 'posts')
