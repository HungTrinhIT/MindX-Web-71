import { ObjectId } from 'mongodb';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import CloudinaryService from '../services/cloudinary.service.js';

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const files = req.files;
  const user = req.user;

  if (!title || !description) {
    res.status(400).json({
      message: 'Missing required keys',
    });
  }

  let uploadPromises = [];
  if (files.length > 0) {
    uploadPromises = files.map(async (file) => {
      return CloudinaryService.uploadSingleFile(file.path);
    });
  }

  const uploadedPhotos = await Promise.all(uploadPromises);

  const newPost = {
    title,
    description,
    photos: uploadedPhotos || [],
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.posts.insertOne(newPost);

  res.status(201).json({
    message: 'Created successfully',
  });
});

const getAllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'desc'; //

    // 1. Tăng dần: ascending - asc
    // 2. Giảm dần: descending - desc
    const skip = (page - 1) * limit;
    const sortValue = sort === 'desc' ? -1 : 1;

    const posts = await db.posts
      .find()
      .sort({
        createdAt: sortValue,
      })
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalPost = await db.posts.countDocuments();
    const totalPages = Math.ceil(totalPost / limit);

    res.json({
      data: posts || [],
      pagination: {
        totalItems: totalPost,
        limit,
        currentPage: page,
        totalPages,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllPostsByUser = async (req, res) => {
  // Logic
};

const getSingleByID = async (req, res) => {
  const { id } = req.params;

  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    return res.json({
      message: 'Post not found',
    });
  }

  res.json(existingPost);
};

const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    return res.status(400).json({
      message: 'Post not found',
    });
  }

  const updatedFields = {
    ...(title && { title }),
    ...(description && { description }),
  };

  await db.posts.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updatedFields,
    }
  );

  return res.json({
    message: 'Update post successfully',
  });
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    return res.status(400).json({
      message: 'Post not found',
    });
  }

  await db.posts.deleteOne({ _id: new ObjectId(id) });
  return res.json({ data: 'Delete successfully' });
};

const PostController = {
  createPost,
  getAllPost,
  getSingleByID,
  updatePost,
  deletePost,
};

export default PostController;
