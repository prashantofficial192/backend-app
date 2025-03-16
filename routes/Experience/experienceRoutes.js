import express from 'express';
import {
    getAllExperience,
    createExperience,
    getExperienceById,
    deleteExperience,
    updateExperience
} from '../../controllers/Experience/experienceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Experience
 *     description: APIs related to admin work experience
 */

/**
/**
 * @swagger
 * /api/experience:
 *   get:
 *     summary: Retrieve all work experience entries
 *     description: Fetch all work experience entries from the database.
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: Experience fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
 *       400:
 *         description: Invalid request
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
 *         description: Server error
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
router.get('/experience', getAllExperience);

/**
 * @swagger
 * /api/experience:
 *   post:
 *     summary: Create a new work experience entry
 *     description: Adds a new work experience entry to the database.
 *     tags: [Experience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Experience"
 *     responses:
 *       201:
 *         description: Experience entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
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
router.post('/experience', createExperience);

/**
 * @swagger
 * /api/experience/{id}:
 *   get:
 *     summary: Get a specific work experience entry by ID
 *     description: Retrieve details of a specific work experience entry from the database using its unique ID.
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the experience entry.
 *     responses:
 *       200:
 *         description: Experience entry retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Experience entry not found.
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
router.get('/experience/:id', getExperienceById);

/**
 * @swagger
 * /api/experience/{id}:
 *   delete:
 *     summary: Delete a specific work experience entry by ID
 *     description: Remove a work experience entry from the database using its unique ID.
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the experience entry to delete.
 *     responses:
 *       200:
 *         description: Experience entry deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Experience entry not found.
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
router.delete('/experience/:id', deleteExperience);

/**
 * @swagger
 * /api/experience/{id}:
 *   put:
 *     summary: Update a specific work experience entry by ID
 *     description: Update an existing work experience entry in the database using its unique ID.
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the experience entry to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Experience"
 *           example:
 *             companyName: "Google"
 *             companyWebsite: "https://google.com"
 *             location: "California, USA"
 *             jobRole: "Software Engineer"
 *             startDate: "2022-01-01"
 *             endDate: "2024-02-01"
 *             isPresent: false
 *             employmentType: "Full-time"
 *             jobDescription: "Worked on developing scalable backend services."
 *     responses:
 *       200:
 *         description: Experience entry updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
 *             example:
 *               _id: "6605d98b9f1c6c23f0123456"
 *               companyName: "Google"
 *               companyWebsite: "https://google.com"
 *               location: "California, USA"
 *               jobRole: "Software Engineer"
 *               startDate: "2022-01-01"
 *               endDate: "2024-02-01"
 *               isPresent: false
 *               employmentType: "Full-time"
 *               jobDescription: "Worked on developing scalable backend services."
 *               createdAt: "2022-01-01T12:00:00.000Z"
 *               updatedAt: "2024-02-01T12:00:00.000Z"
 *       400:
 *         description: Invalid request or ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Experience entry not found.
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
router.put('/experience/:id', updateExperience);

/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       required:
 *         - companyName
 *         - location
 *         - jobRole
 *         - startDate
 *         - endDate
 *         - employmentType
 *         - jobDescription
 *       properties:
 *         companyName:
 *           type: string
 *           description: Name of the company
 *         companyWebsite:
 *           type: string
 *           nullable: true
 *           description: Website URL of the company (optional)
 *         location:
 *           type: string
 *           description: Location of the company
 *         jobRole:
 *           type: string
 *           description: Job role in the company
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of employment
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of employment
 *         isPresent:
 *           type: boolean
 *           default: false
 *           description: Whether the job is currently ongoing
 *         employmentType:
 *           type: string
 *           description: Type of employment (e.g., Full-time, Part-time, Internship)
 *         jobDescription:
 *           type: string
 *           description: Brief description of job responsibilities
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the entry was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the entry was last updated
 */

export default router