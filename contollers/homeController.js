const router = require('express').Router();
const {getAll} = require('../services/blogService')


//TODO replace with real controller
router.get('/', async (req,res) => {
    const blogs = await getAll();
    const hasBlogs = blogs.length > 0;
    const lastBlogs = blogs.slice(-3);
    
    res.render('pages/home', {
        title: 'Home page',
        user: req.user,
        blogs: lastBlogs,
        hasBlogs
    })
})


module.exports = router;