function parseError(error) {
    if(error.name === 'ValidationError') { //that is from Mongoose
        return Object.values(error.errors).map(value=> value.message);
    } else {
    //error.message is just a string, we parse it to the array 
    return error.message.split('\n')
    }
    
}

module.exports = {
    parseError
}