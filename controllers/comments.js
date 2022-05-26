const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid'); // import uuid to generate random ID's

const s3 = new S3(); // initialize s3 constructor

module.exports = {
    create,
}

function create(req, res){
    const Post = Post.findById(req.params.Id, function(err, postdb) {
        postdb.comments.push({
            comment:req.body.comment,
            user: req.user.name,
        });
        postdb.save(function(err) {
            res.status(201).json({post: Post})
        })
    })
}
