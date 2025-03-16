import express from 'express';
import {
    getAllEducation,
    createEducation,
    getEducationById,
    updateEducation,
    deleteEducation
} from '../../controllers/Education/educationController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Education
 *     description: APIs related to show admin education
 */

/**
 * @swagger
 * /api/education:
 *   get:
 *     summary: Retrieve all education details
 *     description: Fetch all education records from the database.
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of education entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Education"
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/education', getAllEducation);

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Create a new education entry
 *     description: Add a new education record to the database.
 *     tags: [Education]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Education"
 *     responses:
 *       201:
 *         description: Education entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Education"
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation Error"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/education', createEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Get a specific education entry by ID
 *     description: Retrieve details of a specific education entry from the database using its unique ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the education entry.
 *     responses:
 *       200:
 *         description: Education entry retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Education"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Education entry not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Education entry not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/education/:id', getEducationById);

/**
 * @swagger
 * /api/education/{id}:
 *   put:
 *     summary: Update a specific education entry by ID
 *     description: Update an existing education entry in the database using its unique ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the education entry to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Education"
 *     responses:
 *       200:
 *         description: Education entry updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Education"
 *       400:
 *         description: Invalid request or ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *       404:
 *         description: Education entry not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Education entry not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.put('/education/:id', updateEducation);

/**
 * @swagger
 * /api/education/{id}:
 *   delete:
 *     summary: Delete a specific education entry by ID
 *     description: Remove an education entry from the database using its unique ID.
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the education entry to delete.
 *     responses:
 *       200:
 *         description: Education entry deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Education entry deleted successfully"
 *       400:
 *         description: Invalid ID format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid ID format"
 *       404:
 *         description: Education entry not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Education entry not found"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.delete('/education/:id', deleteEducation);

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       required:
 *         - instituteName
 *         - fieldOfStudy
 *         - location
 *         - startDate
 *         - endDate
 *         - description
 *       properties:
 *         instituteName:
 *           type: string
 *           description: Name of the educational institute
 *           example: "Harvard University"
 *         fieldOfStudy:
 *           type: string
 *           description: Field of study or major
 *           example: "Computer Science"
 *         location:
 *           type: string
 *           description: Location of the institute
 *           example: "Cambridge, MA, USA"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of education
 *           example: "2019-08-01"
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of education (if not currently enrolled)
 *           example: "2023-05-30"
 *         description:
 *           type: string
 *           description: Additional details about the education
 *           example: "Bachelor's degree in Computer Science with a focus on AI and ML."
 *         instituteLink:
 *           type: string
 *           nullable: true
 *           description: Website URL of the institute (optional)
 *           example: "https://www.harvard.edu"
 *         isCurrentlyEntolled:
 *           type: boolean
 *           default: false
 *           description: Whether the student is currently enrolled in this institute
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the entry was created
 *           example: "2023-01-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the entry was last updated
 *           example: "2024-02-01T12:00:00.000Z"
 */



export default router;