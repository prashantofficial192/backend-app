import express from 'express';
import upload from "../../middleware/multer.js"
import {
    getAllBlogs,
    createBlog
} from '../../controllers/Blog/blogController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Blog
 *     description: APIs related to manage blog
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve all blog posts
 *     description: Fetch all blog posts from the database.
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Blogs fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Blog"
 *       400:
 *         description: Invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */


router.get('/blogs', getAllBlogs);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog post
 *     description: Add a new blog post to the database with an image upload option.
 *     tags: [Blog]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - blogTitle
 *               - content
 *               - tags
 *               - image
 *               - readingTime
 *               - slug
 *               - authorName
 *               - authorAvatar
 *               - isLatestBlog
 *               - status
 *             properties:
 *               blogTitle:
 *                 type: string
 *                 description: Title of the blog
 *               content:
 *                 type: string
 *                 description: Main content of the blog
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags related to the blog
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the blog
 *               readingTime:
 *                 type: number
 *                 description: Estimated reading time in minutes
 *               slug:
 *                 type: string
 *                 description: URL-friendly identifier for the blog
 *               authorName:
 *                 type: string
 *                 description: Name of the blog author
 *               authorAvatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the author's avatar
 *               isLatestBlog:
 *                 type: boolean
 *                 description: Flag to indicate if it's the latest blog
 *                 default: false
 *               status:
 *                 type: string
 *                 enum: ["draft", "published"]
 *                 description: Status of the blog (draft or published)
 *                 default: "draft"
 *     responses:
 *       201:
 *         description: Blog post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Blog"
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// router.post('/blogs', upload.single('image'), createBlog);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - blogTitle
 *         - content
 *         - tags
 *         - image
 *         - readingTime
 *         - slug
 *         - authorName
 *         - authorAvatar
 *         - isLatestBlog
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the blog
 *         blogTitle:
 *           type: string
 *           description: Title of the blog
 *         content:
 *           type: string
 *           description: Main content of the blog
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags related to the blog
 *         image:
 *           type: string
 *           format: uri
 *           description: URL of the blog image
 *           default: "https://via.placeholder.com/150"
 *         readingTime:
 *           type: number
 *           description: Estimated reading time in minutes
 *           default: 1
 *         slug:
 *           type: string
 *           description: URL-friendly identifier for the blog
 *         authorName:
 *           type: string
 *           description: Name of the blog author
 *         authorAvatar:
 *           type: string
 *           format: uri
 *           description: URL of the author's avatar
 *           default: "https://via.placeholder.com/150"
 *         isLatestBlog:
 *           type: boolean
 *           description: Flag to indicate if it's the latest blog
 *           default: false
 *         status:
 *           type: string
 *           enum: ["draft", "published"]
 *           description: Status of the blog (draft or published)
 *           default: "draft"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the blog was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the blog was last updated
 */
