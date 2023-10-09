import express from 'express';
import UserController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';
import uploadMdw from '../middlewares/upload.mdw.js';

const router = express.Router();

router.put(
  '/avatar',
  authMiddleware,
  uploadMdw.single('image'),
  UserController.uploadAvatar
);

router.put('/profile', UserController.updateProfile);

export default router;
