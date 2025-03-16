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

// create blog
export async function createBlog(req, res) {
    try {
        // Check if the uploaded file exists
        if (!req.file) {
            return res.status(400).json({
                // If no file uploaded, return a 400 response
                message: 'No file uploaded. Please upload an image.',
            });
        }

        // Use streamifier to convert the uploaded file buffer to a readable stream
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'blogs',
            }, // Automatically determine the resource type (image, video, etc.)
            async (error, result) => {
                // Callback function for when the upload completes
                if (error) {
                    return res.status(500).json({
                        // Handle any errors during the upload
                        message: 'Error uploading image to Cloudinary',
                        error: error.message,
                    });
                }

                // Create the new blog entry with the URL returned from Cloudinary
                const newBlog = new Blog({
                    ...req.body, // Spread the other fields from the request body
                    blogFeaturedImage: result.secure_url, // Use the secure URL from Cloudinary as the featured image
                });

                // Save the new blog entry to the database
                const savedBlog = await newBlog.save();

                res.status(201).json({
                    // Return a success response with the created blog
                    message: 'Blog created successfully',
                    blogCreated: savedBlog,
                });
            }
        );

        // Pipe the buffer of the uploaded file to the Cloudinary upload stream
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = {};

            // Extract field-specific validation errors
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                message: 'Validation Error',
                errors
            });
        }

        res.status(400).json({
            message: 'Error creating experience',
            error: error.message
        });
    }
}