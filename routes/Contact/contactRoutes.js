import express from 'express';
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContactById,
    deleteContactById
} from '../../controllers/Contact/contactController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Contact
 *     description: APIs related to manage users responses
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: Successfully retrieved all contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Server error
 */
router.get('/contacts', getAllContacts);

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a new contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - messageBody
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               messageBody:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/contact', createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a single contact message by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.get('/contacts/:id', getContactById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update contact message status
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               messageBody:
 *                 type: string
 *               messageStatus:
 *                 type: string
 *                 enum: [Unread, Read, Replied]
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.put('/contacts/:id', updateContactById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact message by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Server error
 */
router.delete('/contacts/:id', deleteContactById);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the contact message
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 *         messageBody:
 *           type: string
 *           description: The content of the contact message
 *         messageStatus:
 *           type: string
 *           enum: [Unread, Read, Replied]
 *           description: The status of the message
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
