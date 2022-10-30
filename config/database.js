const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/mind-blog'

module.exports = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('Database connected!')
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}