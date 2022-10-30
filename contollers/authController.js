const router = require('express').Router();
const {login, register} = require('../services/authService')
const {parseError} = require("../util/parser");

router.get('/register', (req,res) => {
    res.render('pages/register', {
        title: 'Register page'
    })
})

router.post('/register', async (req,res) => {
        const formData = req.body;
        //TODO remove the log
        console.log('formData from the register form >>> ', formData)
    
        try {
            if(formData.password.length < 4) {
                throw new Error('The password must be at least 4 characters long!')    
            }
            if (formData.password !== formData.repass) {
                throw new Error("The passwords don't match!")
            }
    
            if (!formData.username || !formData.password || !formData.repass || !formData.email) {//if there are an empty strings, this is also a falsy value
                throw new Error("All fields are required!")
            }
    
            //the json web token
            const token = await register(formData.username, formData.email, formData.password);
    
            //set as a cookie our JSON Web Token
            res.cookie('token', token);
    
            res.redirect('/')//if we don't redirect, it will load the page forever}
        } catch (error) {
            const errors = parseError(error);
            
            res.render('pages/register', {
                title: 'Register page',
                errors,
                body: {
                    email: formData.email,
                    username: formData.username
                }
            })
        }
})

router.get('/login', (req,res) => {
    res.render('pages/login', {
        title: 'Login page'
    })
})

router.post('/login', async (req,res) => {
    const formData = req.body;
    //TODO remove the log
    console.log('formData from the login form >>> ', formData)

    try {

        if (!formData.password || !formData.email) {
            throw new Error("All fields are required!")
        }
        
        //the json web token
        const token = await login(formData.email, formData.password);

        //set as a cookie our JSON Web Token
        res.cookie('token', token);

        res.redirect('/')//if we don't redirect, it will load the page forever}
    } catch (error) {
        const errors = parseError(error);

        //TODO add error display to the actual template from the assignment
        res.render('pages/login', {
            title: 'Login page',
            errors,
            body: {
                email: formData.email,
            }
        })
    }
})

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router;