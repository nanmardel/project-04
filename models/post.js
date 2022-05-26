const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const commentsSchema = mongoose.Schema({
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    
}, {
    timestamps: true
});



// A post has many likes, a like belongs to a POST
const postSchema = new mongoose.Schema({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model
    photoUrl: String,
    caption: String,
    likes: [likesSchema], // embedded schema
    comments:[commentsSchema]
    })

module.exports = mongoose.model('Post', postSchema);