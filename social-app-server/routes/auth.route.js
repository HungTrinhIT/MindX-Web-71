import express from 'express';

import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/current-user', authMiddleware, AuthController.fetchCurrentUser);

export default router;
