import Blog from "../../models/Blog/blog.model.js";
// import cloudinary from "../../config/cloudinaryConfig.js"
// import streamifier from "streamifier";

// Get all blogs
export async function getAllBlogs(req, res) {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}