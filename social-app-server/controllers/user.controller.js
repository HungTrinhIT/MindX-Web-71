import asyncHandler from 'express-async-handler';
import CloudinaryService from '../services/cloudinary.service.js';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';

const updateUserAvatar = asyncHandler(async (req, res) => {
  const file = req.file;
  const user = req.user;

  if (!file) {
    res.status(400);
    throw new Error('No file uploaded or an occurs');
  }
  const { url } = await CloudinaryService.uploadFile(file.path);

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

  res.json({ message: 'Update avatar successfully', url });
});
const updateUserProfile = (req, res) => {};

const UserController = {
  updateUserAvatar,
  updateUserProfile,
};

export default UserController;
