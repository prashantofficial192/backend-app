import express from 'express';
import { getAllExperience } from '../../controllers/Experience/experienceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Experience
 *     description: APIs related to user work experience
 *     x-displayName: Experience
 *     x-collapsed: true
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   companyName:
 *                     type: string
 *                   companyWebsite:
 *                     type: string
 *                   location:
 *                     type: string
 *                   jobRole:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                   endDate:
 *                     type: string
 *                   isPresent:
 *                     type: boolean
 *                   employmentType:
 *                     type: string
 *                   jobDescription:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
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

export default router