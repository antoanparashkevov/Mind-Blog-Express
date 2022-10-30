const Blog = require('../models/Blog');

const getAll = () => {
    return Blog.find({}).lean()
}

const getById = (id)=>{
    //lean extracts only the values, not methods or virtual properties just for security (express-handlebars error)
    return Blog.findById(id).lean()
}

const create = async (data,ownerId) => {
    const blog = {
        title: data.title,
        image: data.image,
        content: data.content,
        blogCategory: data.category,
        owner: ownerId
    }

    const missing = Object.entries(blog).filter(([k,v])=> !v);

    if(missing.length > 0) {
        throw new Error(missing.map(m=>`${m[0]} is required!`).join('\n'));
    }
    
    if(data.image.startsWith('http') === false || data.image.startsWith('https') === false) {
        throw new Error('The image must start with http or https!')
    }

    const result = await Blog.create(blog);
    return result;
}

const update = async (blogId, blogData) => {
    const missing = Object.entries(blogData).filter(([k,v])=> !v);

    if(missing.length > 0) {
        throw new Error(missing.map(m=>`${m[0]} is required!`).join('\n'));
    }

    const blog = await Blog.findById(blogId)

    blog.title = blogData.name;
    blog.image = blogData.image;
    blog.content = blogData.content;
    blog.blogCategory = blogData.category

    console.log('Updated room',blog)
    await blog.save();

}

const follow = async (blogId,userId) => {

    const blog = await Blog.findById(blogId)
    console.log('from db')
    blog.followList.push(userId)

    console.log('Updated blog',blog)
    await blog.save();

}


const deleteById = async (roomId) => {
    return Blog.findByIdAndDelete(roomId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    follow
}
