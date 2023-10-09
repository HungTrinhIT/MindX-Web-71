import express from 'express';
import authMiddleware from '../middlewares/auth.mdw.js';
import UserController from '../controllers/user.controller.js';
import uploadMdw from '../middlewares/upload.mdw.js';
const router = express.Router();

router.put(
  '/avatar',
  authMiddleware,
  uploadMdw.single('image'),
  UserController.updateUserAvatar
);
router.put('/profile', authMiddleware, UserController.updateUserProfile);

export default router;
