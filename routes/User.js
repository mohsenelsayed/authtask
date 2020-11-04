const express = require('express');
const router = express.Router();

const Posts = require('../models/Posts');

const protected = require('../utils/Protected');

router.get('/posts',protected, async(req,res) => {
    let posts = await Posts.find({author: req.user._id.$oid}, (err,posts) => {
        if(err) res.status(400).json({message: "Something went wrong, please try again."});
        else{
            res.status(200).json(posts);
        }
    });
});

module.exports = router;