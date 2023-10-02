import express from 'express';

import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import AuthValidator from '../valdationSchema/auth.validator.js';

const router = express.Router();

router.post(
  '/login',
  validateMdw(AuthValidator.loginSchema),
  AuthController.login
);
router.post(
  '/signup',
  validateMdw(AuthValidator.registerSchema),
  AuthController.register
);
router.get('/current-user', authMiddleware, AuthController.fetchCurrentUser);

export default router;
