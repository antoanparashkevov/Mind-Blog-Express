const {getById} = require("../services/authService");
const {getAll} = require("../services/blogService");
const router = require('express').Router();

router.get('/details', async (req,res)=> {
    const userId = req.user._id;
    const user = await getById(userId);
    const userBlogs = await getAll()
    const allBlogsCount = userBlogs.length
    userBlogs.filter(blog=> blog.owner === userId);
    const blogsCount = userBlogs.length;
    const followCount = allBlogsCount - blogsCount;
    user.blogsCount = blogsCount;
    user.followCount = followCount;
    res.render('pages/profile', {
        title: 'Profile information',
        user,
        blogs: userBlogs
    })
})


module.exports = router;