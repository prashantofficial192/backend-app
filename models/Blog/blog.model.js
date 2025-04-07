import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
    {
        blogTitle: {
            type: String,
            required: [true, 'Blog title is required'],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        tags: {
            type: [String],
            required: [true, 'Tags are required'],
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            default: 'https://via.placeholder.com/150',
        },
        readingTime: {
            type: Number,
            required: [true, 'Reading time is required'],
            default: 1,
        },
        slug: {
            type: String,
            unique: true,
        },
        authorName: {
            type: String,
            required: [true, 'Author name is required'],
        },
        authorAvatar: {
            type: String,
            required: [true, 'Author avatar is required'],
            default: 'https://via.placeholder.com/150',
        },
        isLatestBlog: {
            type: Boolean,
            required: [true, 'Latest blog  selection is required'],
            default: false
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft'
        }
    },
    { timestamps: true }
)

// Create a slug before saving the blog
blogSchema.pre('save', function (next) {
    if (this.blogTitle && !this.slug) {
        this.slug = slugify(this.blogTitle, { lower: true, strict: true });
    }
    next();
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;