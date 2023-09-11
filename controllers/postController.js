const Post = require("../models/postModels");

// geting all posts from mongo db.
exports.getAllPost = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            Number_of_blogs: posts.length,
            data: {
                posts: posts
                
            }
    })
    } catch (err) {
        res.status(400).json({
            success: false,           
        })
    }   
}

// geting specific post from mongo db.
// localhost:3000/posts/:id
exports.getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        res.status(400).json({
            success: false,
        })
    }
}

// creating post inside db.
exports.createPost = async (req, res) => {
    try {
        console.log(req.body)
        const newPost = await Post.create(req.body);
        console.log(newPost)
        res.status(201).json({
            success: true,
            newPost
        })
    } catch (error) {
        res.status(400).json({
            success: false,
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true,
            useFindAndModify: true
        })

        res.status(200).json({
            success: true,
            post
        }) 
    } catch (error) {
        res.status(400).json({
            success: false,
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: "Post deleted Successfully."
        })
    
    } catch (error) {
        res.status(400).json({
            success: false,
        })
    }
}