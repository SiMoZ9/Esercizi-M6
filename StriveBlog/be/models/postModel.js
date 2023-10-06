const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({

    category: {
      type: String,
      required: true
    },

    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    readTime: {
        value: {
            type: Number,
            required: true
        },
        unit:{
            type: String,
            required: true
        },
    },
    author: {
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('postModel', PostSchema, 'posts')