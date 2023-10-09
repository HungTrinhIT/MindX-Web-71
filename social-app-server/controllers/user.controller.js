import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';
import CloudinaryService from '../services/cloudinary.service.js';

const uploadAvatar = asyncHandler(async (req, res) => {
  // 1. Get file from request object
  const file = req.file;
  const user = req.user;

  // 2. Upload file from server to Cloudinary
  const { url } = await CloudinaryService.uploadSingleFile(file.path);

  // 3. Update user avatar to mongodb
  await db.users.updateOne(
    {
      _id: new ObjectId(user.id),
    },
    {
      $set: {
        avatar: url,
      },
    }
  );

  res.json({
    message: 'Upload avatar successfully',
  });
});

const updateProfile = asyncHandler(async (req, res) => {});

const UserController = {
  uploadAvatar,
  updateProfile,
};

export default UserController;
