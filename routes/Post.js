const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Posts = require('../models/Posts');

const protected = require('../utils/Protected.js');

router.get('/all', async (req,res) => {
    try{
        const posts = await Posts.find({});
        return posts.length > 0 ? res.status(200).json(posts) : res.status(400).json({message: "No posts found :( ."});
    }catch(err) {
        console.log(err.message);
        return res.status(400).json({message: "Something went wront, please try again."});
    }
});

router.post('/new', protected, async (req,res) => {
    try{
        let post = new Object;
        post.content = req.headers['content'];
        post.author = mongoose.Types.ObjectId(req.user._id.$oid);
        const newPost = new Posts(post);
        await newPost.save(() => {
            console.log(`New post added by ${post.author}`);
        });
        res.status(201).json({message: "Post added successfully!"});
    }catch(err) {
        console.log(err.message);
        return res.status(400).json({message: "Something went wrong, please try again."});
    }
});

router.delete('/delete', protected, async (req,res) => {
    try{
        let {id,author} = req.headers;
        if(author == req.user._id.$oid){
            let deleted = await Posts.findByIdAndDelete(id);
            if(deleted != undefined) res.status(200).json({message: "Post has been deleted."});
            else res.status(404).json({message: "Post not found."});
        }else{
            console.log('here');
            return res.status(300).json({message: "Forbidden!"});
        }
    }catch(err){
        console.log(err.message);
        return res.status(400).json({message: "Something went wrong, please try again."});
    }
});






module.exports = router;