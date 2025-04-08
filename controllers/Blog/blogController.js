import Blog from "../../models/Blog/blog.model.js";
import cloudinary from "../../config/cloudinaryConfig.js"
import streamifier from "streamifier";

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

// Get a blog by ID
export async function getBlogById(req, res) {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}

// create blog
export async function createBlog(req, res) {
    try {
        const files = req.files;

        if (!files || !files.image || !files.authorAvatar) {
            return res.status(400).json({ message: 'Both image and authorAvatar are required.' });
        }

        // Upload blog image
        const blogImageUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'blogs',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(files.image[0].buffer).pipe(stream);
        });

        // Upload author avatar
        const authorAvatarUpload = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'authors',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            streamifier.createReadStream(files.authorAvatar[0].buffer).pipe(stream);
        });

        // Optional: convert tags from comma-separated string to array
        const tags = req.body.tags
            ? req.body.tags.split(',').map(tag => tag.trim())
            : [];

        if (!req.body.slug || req.body.slug.trim() === "") {
            delete req.body.slug; // <-- Important: let Mongoose pre-save hook handle it
        }

        const newBlog = new Blog({
            ...req.body,
            tags,
            image: blogImageUpload.secure_url,
            authorAvatar: authorAvatarUpload.secure_url,
        });

        const savedBlog = await newBlog.save();

        res.status(201).json({
            message: 'Blog created successfully',
            blogCreated: savedBlog,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating blog',
            error: error.message,
        });
    }
}

// Update a blog by ID
export async function updateBlogById(req, res) {
    try {
        const files = req.files;
        let blogImageUrl, authorAvatarUrl;

        if (files && files.image) {
            // Upload new blog image
            const blogImageUpload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'blogs',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(files.image[0].buffer).pipe(stream);
            });
            blogImageUrl = blogImageUpload.secure_url;
        }

        if (files && files.authorAvatar) {
            // Upload new author avatar
            const authorAvatarUpload = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: 'authors',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                streamifier.createReadStream(files.authorAvatar[0].buffer).pipe(stream);
            });
            authorAvatarUrl = authorAvatarUpload.secure_url;
        }
        

        const updatedBlogData = { ...req.body };
        if (blogImageUrl) updatedBlogData.image = blogImageUrl;
        if (authorAvatarUrl) updatedBlogData.authorAvatar = authorAvatarUrl;

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlogData, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            message: 'Blog updated successfully',
            blogUpdated: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}


// Delete a blog by ID
export async function deleteBlogById(req, res) {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }
        res.status(200).json({
            message: 'Blog deleted successfully',
            blogDeleted: blog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message,
        });
    }
}