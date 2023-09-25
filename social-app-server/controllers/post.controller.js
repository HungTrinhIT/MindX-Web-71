import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const createPost = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: 'Missing required keys',
    });
  }

  const newPost = {
    title,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.posts.insertOne(newPost);

  res.status(201).json({
    message: 'Created successfully',
  });
};

const getAllPost = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await db.posts.find().skip(skip).limit(limit).toArray();
  const totalPost = await db.posts.countDocuments();
  const totalPages = Math.ceil(totalPost / limit);

  res.json({
    data: posts,
    pagination: {
      totalItems: totalPost,
      limit,
      currentPage: page,
      totalPages,
    },
  });
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
