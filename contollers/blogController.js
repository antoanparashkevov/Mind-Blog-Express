const router = require('express').Router();
const {getAll, getById} = require('../services/blogService');
const User = require('../models/User')

router.get('/', async (req,res)=>{
    
    const blogs = await getAll()
    res.render('pages/catalog',{
        title: 'Catalog page',
        blogs,
       
    })
})

router.get('/:id',async (req,res)=>{
    const id = req.params.id;
    const blog = await getById(id);
    const owner = await User.findById(blog.owner);
    blog.ownerMail = owner.email;
    let hasFollowed = null;
    if(req.user) {
        hasFollowed = blog.followList.find(id=>id.toString() === req.user._id)
    }
    
    if(req.user && req.user._id == blog.owner) {
        blog.isOwner = true
    }
    
    if(!hasFollowed && req.user) {
        blog.canFollow = true;
    }
    
    if(req.user && hasFollowed) {
        blog.cantFollow = true;
    }
    
    if(blog){
        res.render('pages/details',{
            title: 'Details for ' + blog.title,
            blog,
        })
    }else {
        // res.render('pages/notFound',{
        //     title: `Code ${id} not found`,
        //     id
        // })
    }

})


module.exports = router;