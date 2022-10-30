const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

//Import Middlewares
const titleMiddleware = require('../middlewares/title');
const session = require('../middlewares/session');
const trim = require('../middlewares/trim');
const userNav = require('../middlewares/userNav');

module.exports = (app) => {
    const hbs = handlebars.create({
        extname: '.hbs'
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    
    //Embedded Middlewares
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    
    //Application Middlewares
    app.use(titleMiddleware('Mind Blog'));
    app.use(session());
    app.use(userNav());
    app.use(trim('password'));
}