import express from 'express'
import upload from "../../middleware/multer.js"
import {
    getAllSkills,
    createSkill,
    getSkillById,
    updateSkillById,
    deleteSkillById,
} from '../../controllers/Skill/skillController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Skill
 *     description: APIs related to show admin skills
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Retrieve all skills
 *     description: Fetch all skills listed under admin panel.
 *     tags: [Skill]
 *     responses:
 *       200:
 *         description: Skills fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Skill"
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

router.get('/skills', getAllSkills)

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Create a new skill
 *     description: Add a new skill to the admin panel with an image upload.
 *     tags: [Skill]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - proficiency
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               proficiency:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [Developer Tools, Programming Skills, Other]
 *               experience:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */

router.post('/skills', upload.single('image'), createSkill)

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Get a skill by ID
 *     description: Retrieve a single skill's details by its unique ID.
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the skill
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skill"
 *       404:
 *         description: Skill not found.
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

router.get('/skills/:id', getSkillById)

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Update a skill by ID
 *     description: Update an existing skill's details using its ID. Allows changing name, image, proficiency, category, or experience.
 *     tags: [Skill]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the skill to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the skill
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file for the skill
 *               proficiency:
 *                 type: string
 *                 description: Skill proficiency level
 *               category:
 *                 type: string
 *                 enum: [Developer Tools, Programming Skills, Other]
 *                 description: Category the skill belongs to
 *               experience:
 *                 type: string
 *                 description: Duration or experience with the skill
 *     responses:
 *       200:
 *         description: Skill updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Skill"
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Skill not found.
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

router.put('/skills/:id', upload.single('image'), updateSkillById)

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Delete a skill by ID
 *     description: Delete a skill from the database using its ID.
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the skill to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Skill not found.
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

router.delete('/skills/:id', deleteSkillById)

/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - proficiency
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the skill
 *         name:
 *           type: string
 *           description: Name of the skill
 *         image:
 *           type: string
 *           format: uri
 *           description: URL or path of the skill image
 *         proficiency:
 *           type: string
 *           description: Skill proficiency level
 *         category:
 *           type: string
 *           enum: [Developer Tools, Programming Skills, Other]
 *           description: Category the skill belongs to
 *         experience:
 *           type: string
 *           description: Years or duration of experience with the skill
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Time when the skill was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Time when the skill was last updated
 */

export default router