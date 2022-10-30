const homeController = require('../contollers/homeController');
const authController = require('../contollers/authController');
const blogController = require('../contollers/blogController');
const profileController = require('../contollers/profileController');
const createController = require('../contollers/createController');
const editController = require('../contollers/editController');
const deleteController = require('../contollers/deleteController');
const notFoundController = require('../contollers/notFoundController');
const {isUser} = require("../middlewares/guards");


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', blogController);
    app.use('/profile', isUser(), profileController);
    app.use('/create',isUser(), createController);
    app.use('/catalog', editController);
    app.use('/catalog', deleteController);
    app.all('/*',notFoundController);
}