import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/login', loginUser);
router.post('/auth/register', registerUser);

export default router;