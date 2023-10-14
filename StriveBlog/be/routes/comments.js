const express = require('express');
const commentsModel = require("../models/commentsModel");
const postModel = require("../models/postModel");
const comment = express.Router()

comment.get('/blogPosts/:id/comments', async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const findPost = await postModel.findById(id).populate("comments")
        


        if (!findPost) {
            res.status(404).send({
                statusCode: 404,
                message: 'Comments not found'
            })
        }
        else {
            const justComments = findPost.comments
            res.status(200).send({
                statusCode: 200,
                justComments
            })
        }


    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
        console.log(err)
    }
})

comment.post('/blogPosts/:id/', async (req, res) => {
    const {id} = req.params

    const newModel = new commentsModel({
        post: req.body.post,
        title: req.body.title,
        content: req.body.content
    })

    try {
        await newModel.save()
        const postId = await postModel.findById(id)
        
        if (!postId) {
          res.status(404).send({statusCode: 404})
        }
        
        console.log(postId.comments)

        postId.comments.push(newModel)
        await postId.save()

        res.status(201).send({
            statusCode: 201,
            message: 'Comment published successfully',
            postId
        })

        console.log("Related post: ", id)

    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
        console.log(err)
    }
})

module.exports = comment
