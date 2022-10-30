const {getById, deleteById} = require("../services/blogService");
const router = require('express').Router();

router.get('/:id/delete', async (req, res) => {
    const blogId = req.params.id;
    const blog = await getById(blogId)

    if(!req.user || (blog.owner.toString() !== req.user._id)) {
        return res.redirect('/auth/login')
    }
        await deleteById(blogId)
        res.redirect('/catalog')
    
})

module.exports = router;