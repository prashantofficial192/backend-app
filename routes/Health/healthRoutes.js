import express from 'express';

const router = express.Router();

// Basic health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default router;
