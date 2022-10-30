const router = require('express').Router();
const { getById, update, follow} = require('../services/blogService')
const {parseError} = require("../util/parser");
const Blog = require('../models/Blog')

router.get('/:id/edit', async (req, res) => {
    const blogId = req.params.id;
    const blog = await getById(blogId);

    if(!req.user || (blog.owner.toString() !== req.user._id)) {
        return res.redirect('/auth/login')
    }

    res.render('pages/edit', {
        title: `Edit ${blog.title}`,
        blog
    })
})

router.post('/:id/edit', async (req,res) => {
    const blogId = req.params.id;
    const blogData = req.body;
    
    console.log('formData', blogData)
    
    const blog = await getById(blogId)
    console.log('blog',blog)
    
    if(!req.user || (blog.owner.toString() !== req.user._id)) {
        return res.redirect('/auth/login')
    }

    try{
        await update(blogId, blogData)
        res.redirect('/catalog/' + blogId)
    }catch (err){
        const errors = parseError(err)
        req.body._id = blogId
        res.render('pages/edit',{
            title: 'Update error',
            error: err.message.split('\n'),
            blog: req.body,
            errors
        })
    }

})

router.get('/:id/follow', async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId)
    
    if(!req.user || blog.owner.toString() === req.user._id || blog.followList.includes(req.user._id) === true) {
        return res.redirect('/auth/login')
    }

    blog.followList.push(req.user._id)
    await blog.save();
    
    // await follow(blogId,req.user._id)
    res.redirect('/catalog/' + blogId) 

})




module.exports = router;