import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { analyticsHandler, feedbackHandler, getUserData } from '../controllers/user.js';

const router = express.Router();

router.get("/data", authMiddleware, getUserData);
router.post("/feedback", authMiddleware, feedbackHandler);
router.get("/analytics", authMiddleware, analyticsHandler);

router.get('/check', (req, res) => {
    res.json({ message: 'CORS check successful' });
});

export default router;