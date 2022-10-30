const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'keygen';

async function register(username, email, password) {
    const existingUser = await User.findOne({email}).collation({strength: 2, locale: 'en'})//case-insensitive, english words
  
    if(existingUser) {
        throw new Error('It has an account with the given email.')      
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userData = await User.create({
        username,
        email,
        hashedPassword,
    })
    console.log('Data from register form to the Database >>> ', userData)
    
    //returns the jsonwebtoken
    return createSession(userData)
    
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({locale: 'en', strength: 2})
   
    if(!user) {
        throw new Error('Incorrect email or password');
    }
    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if(!hasMatch) {
        throw new Error('Incorrect email or password');
    }

    console.log('Data from login form to the Database >>> ', user)


    return createSession(user)
}


function createSession({_id, username,email}) {
    //returns the token
    return jwt.sign({
        _id,
        username,
        email
    }, JWT_SECRET)
}

function verifySession(token) {
    //will return the userData
    return jwt.verify(token,JWT_SECRET);
}

function getById(id) {
    return User.findById(id).lean();
}

module.exports = {
    login,
    register,
    verifySession,
    getById
}