const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid'); // import uuid to generate random ID's
// const post = require('../models/post');
// const user = require('../models/user');
// const BUCKET_NAME = process.env.AWS_BUCKET

const s3 = new S3(); // initialize s3 constructor

module.exports = {
    create,
    index,
    deletePost,
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){

            const post = await Post.create({caption: req.body.caption, user: req.user, photoUrl: data.Location});

            console.log(post)
            res.status(201).json({post: post})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}
async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}


async function deletePost(req, res){
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({post})

    } catch (err){
        res.status(400).json({err})
    }
}
