import express from 'express';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;
  const posts = await db.posts.find().skip(skip).limit(limit).toArray();

  const totalPost = await db.posts.countDocuments();

  const totalPages = Math.ceil(totalPost / limit);
  res.json({
    data: posts,
    pagination: {
      totalPages,
      page,
      totalPost,
      limit,
    },
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    return res.json({
      message: 'Post not found',
    });
  }

  res.json(existingPost);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: 'Missing required keys',
    });
  }

  try {
    const newPost = {
      title,
      description,
    };

    const result = await db.posts.insertOne(newPost);

    res.status(201).json({
      message: 'Post created successfully',
      data: result,
    });
  } catch (error) {
    console.error('create new post failed:', error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const existingPost = await db.posts.findOne({ _id: new ObjectId(id) });

  if (!existingPost) {
    return res.status(400).json({
      message: 'Post not found',
    });
  }

  let updatedFields = {
    ...(title && { title }),
    ...(description && { description }),
  };

  await db.posts.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: updatedFields,
    }
  );

  return res.json({});
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const existingPost = await db.posts.find({ _id: new ObjectId(id) });

  if (!existingPost) {
    return res.json({
      message: 'Post not found',
    });
  }

  await db.posts.deleteOne({ _id: new ObjectId(id) });
  return res.json({ data: 'Delete successfully' });
});

export default router;
