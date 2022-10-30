const { Schema, model, Types: {ObjectId} } = require('mongoose');


const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [5,'The title must be at least 5 characters long!'],
        maxlength: [50, 'The title is too long! It must be bellow 50 characters!']
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: [10, 'The content must be at least 10 characters long!']
    },
    blogCategory: {
        type: String,
        required: true,
        minlength: [3, 'The blog category must be at least 3 characters long!']
    },
    followList: {
        type: [ObjectId],
        ref: 'User'
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = model('Blog', blogSchema);