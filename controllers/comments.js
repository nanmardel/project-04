const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid'); // import uuid to generate random ID's
const post = require('../models/post');

const s3 = new S3(); // initialize s3 constructor

module.exports = {
    create,
}

async function create(req, res){
    try {
    const post = await Post.findById(req.params.Id);
    post.comments.push({
        username:req.user.username,
        userId:req.user._id,
        postId:req.params.Id,
        comment: req.body.comment,
    })
    await post.save()
    console.log(post, "comment function in controllers")
    res.status(201).json({data:post})
    } catch(err){
        res.status(400).json({err})
    }
}
