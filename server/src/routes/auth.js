import express from 'express';
import { register, checkUser, login } from '../controllers/auth.js';

const router = express.Router();

router.get('/check', (req, res) => {
    res.json({ message: 'CORS check successful' });
});
router.post("/register", register);
router.post("/check", checkUser);
router.post("/login", login);

export default router;