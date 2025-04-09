import express from 'express'
import upload from '../../middleware/multer.js'
import {
    getAllProjects,
    createProject,
    getProjectById,
    updateProjectById,
    deleteProjectById
} from '../../controllers/Project/projectController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Project
 *     description: APIs related to show admin projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Retrieve all projects
 *     description: Fetch all projects listed under admin panel.
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Projects fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Server error.
 */
router.get('/projects', getAllProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Add a new project with image upload.
 *     tags: [Project]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image
 *               - description
 *               - startDate
 *               - endDate
 *               - technologyUsed
 *               - categories
 *               - sourceCodeLink
 *               - liveLink
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               technologyUsed:
 *                 type: string
 *                 description: Comma-separated list (e.g., "React, Node.js")
 *               categories:
 *                 type: string
 *                 description: Comma-separated list (e.g., "Frontend, Backend")
 *               sourceCodeLink:
 *                 type: string
 *               liveLink:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error.
 */
router.post('/projects', upload.single('image'), createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve a single project by its unique ID.
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Server error.
 */
router.get('/projects/:id', getProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update an existing project and optionally replace the image.
 *     tags: [Project]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               technologyUsed:
 *                 type: string
 *                 description: Comma-separated values
 *               categories:
 *                 type: string
 *                 description: Comma-separated values
 *               sourceCodeLink:
 *                 type: string
 *               liveLink:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Server error.
 */
router.put('/projects/:id', upload.single('image'), updateProjectById);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Remove a project using its ID.
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Server error.
 */
router.delete('/projects/:id', deleteProjectById);


export default router

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique ID of the project
 *         title:
 *           type: string
 *         image:
 *           type: string
 *           format: uri
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *         endDate:
 *           type: string
 *         technologyUsed:
 *           type: array
 *           items:
 *             type: string
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *         sourceCodeLink:
 *           type: string
 *         liveLink:
 *           type: string
 *         slug:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

