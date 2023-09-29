import express from 'express';
import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import AuthValidator from '../validations/auth.validation.js';
const router = express.Router();

router.post('/login', validateMdw(AuthValidator.login), AuthController.login);
router.post(
  '/register',
  validateMdw(AuthValidator.register),
  AuthController.register
);
router.get('/current-user', authMiddleware, AuthController.fetchCurrentUser);

export default router;
