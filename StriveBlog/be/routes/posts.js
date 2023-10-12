const express = require('express')
const postsModel = require('../models/postModel')
const mongoose = require("mongoose");
const post = express.Router()

// all posts
post.get('/blogPosts', async (req, res) => {


    const {
        page = 1,
        pageSize = 5
    } = req.query

    const posts = await postsModel.find().limit(pageSize).skip((page - 1) * pageSize).populate('author')
    const totalPosts = await postsModel.count()

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
                currentPage: Number(page),
                totalPages: Math.ceil(totalPosts / pageSize),
                totalPosts,
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

post.get('/blogPosts/:id', async (req, res) => {
  const {id} = req.params
  const posts = await postsModel.findById(id).populate('author')
  try {
    if (!posts) {
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
                    message: "Here's your post",
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

post.get('/blogPosts/byTitle', async (req, res) => {
    const {title} = req.query
    console.log(title)
    try {
        // const postByTitle = await postsModel.find({
        //     title: {
        //         $regex: title,
        //         $options: 'i'
        //     }
        // })
        //
        // if (!postByTitle) {
        //     res.status(404)
        //         .send({
        //             statusCode: 404,
        //             message: "Post not found"
        //         })
        // }
        //
        // res.status(200)
        //     .send({
        //         statusCode: 200,
        //         message: "Post found",
        //         postByTitle
        //     })

    } catch (e) {
        res.status(500)
            .send({
                statusCode: 500,
                message: "Internal server error"
            })
    }
})

post.post('/blogPosts', async (req, res) => {
    const newPost = new postsModel({
        category: req.body.category,
        title: req.body.title,
        cover: req.body.cover,
        readTime: {
            value: req.body.readTime.value,
            unit: req.body.readTime.unit
        },
        author: req.body.author,
        content: req.body.content
    })

    try {

        const postSave = await newPost.save()

        res.status(201).send({
            statusCode: 201,
            message: 'Post published successfully',
            postSave
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }

})

post.put('/blogPosts/:id', async (req, res) => {
    const {id} = req.params

    try {
        const postToUpdate = await postsModel.findById(id)
        if(!postToUpdate) {
            res.status(404).send({
                statusCode: 404,
                message: 'User not found'
            })
        }

        const dataToUpdate = req.body;
        const options= { new: true };
        const result = await postsModel.findByIdAndUpdate(id, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: 'Post updated successfully',
            result
        })

    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})
post.delete('/blogPosts/:id', async (req, res) => {
    const {id} = req.params

    try {
        const postToDelete = await postsModel.findByIdAndDelete(id)
        if(!postToDelete) {
            res.status(404).send({
                statusCode: 404,
                message: 'User not found'
            })
        }

        res.status(200).send({
            statusCode: 200,
            message: 'Post deleted successfully'
        })

    } catch(e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

post.delete('/blogPosts/', async (req, res) => {
    try {
        const deleteAll = await postsModel.deleteMany()
        if (deleteAll) {
            console.log("Deleted")
            res.status(200).send({
                statusCode: 200,
                message: "Deleted successfully"
            })
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error"
        })
    }
})

module.exports = post
