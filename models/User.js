const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: {
      type: String,
      required: true,
        minlength: [10, 'Email address must be at least 10 characters long!']
    },
    username: {
        type: String,
        required: true,
        minlength: [2, 'Username must be at least 2 characters long!']
    },
    hashedPassword: {
        type: String,
        required: true,
    }
});

module.exports = model('User', userSchema);