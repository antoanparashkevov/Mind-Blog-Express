const { create } = require('../services/blogService')
const {parseError} = require("../util/parser");
const router = require('express').Router();

router.get('/', (req,res)=> {
    res.render('pages/create', {
        title: 'Create a blog'
    })
})

router.post('/', async (req,res)=>{
    const formData = req.body;
    try{
        await create(formData, req.user._id)
        res.redirect('/catalog')
    }catch (err){
        const errors = parseError(err) 
       console.log(errors)
        // console.log('Error occurred... >>>',err.message.split('\n'))
        res.render('pages/create',{
            title: 'Request error',
            error: err.message.split('\n'),
            errors
        })
    }
})


module.exports = router;