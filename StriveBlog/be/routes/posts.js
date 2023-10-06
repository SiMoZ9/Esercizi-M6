const express = require('express')
const postsModel = require('../models/postModel')
const post = express.Router()

// all posts
post.get('/blogPosts', (req, res) => {
    const posts = new postsModel.find()
    try {

        if(!posts) {
            res.status(404).send(
                {
                    statusCode: 404,
                    message: "Posts not found"
                }
            )
        }

        res.status(200).send(
            {
                statusCode: 200,
                posts
            }
        )
    } catch (e) {
        res.status(500).send(
            {
                statusCode: 500,
                message: "Internal server error"
            }
        )
    }
})

module.exports = post
