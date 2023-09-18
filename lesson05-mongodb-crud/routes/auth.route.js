import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../config/database.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  // 1.Validation request body
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing required keys',
    });
  }

  const existingUser = await db.users.findOne({ email });

  if (!existingUser) {
    return res.json({
      message: 'Email does not correct',
    });
  }

  const isMatchedPassword = bcrypt.compareSync(password, existingUser.password);
  console.log(
    '🚀 ~ file: auth.route.js:27 ~ router.post ~ isMatchedPassword:',
    isMatchedPassword
  );

  if (!isMatchedPassword) {
    return res.json({
      message: 'Password does not correct',
    });
  }

  // Phát hành 1 tấm vé (accessToken) bằng JSON Web Token
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    fullname: existingUser.fullname,
    role: 'user',
  };
  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME, // 5 minutes
  });

  res.json({
    message: 'Login successfully',
    accessToken: token,
  });
});

router.post('/signup', async (req, res) => {
  const { email, password, fullname } = req.body;

  if (!(email && password && fullname)) {
    return res.status(400).json({
      message: 'Missing required keys',
    });
  }

  const existingUser = await db.users.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: 'Email is already taken',
    });
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  const newUser = {
    email,
    password: hashedPassword,
    fullname,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'user',
  };

  await db.users.insertOne(newUser);

  res.status(201).json({
    message: 'Register new user successfully',
  });
});

export default router;
