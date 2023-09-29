import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';

const register = asyncHandler(async (req, res) => {
  const { email, password, gender, fullname } = req.body;

  const existingUser = await db.users.findOne({ email });

  if (existingUser) {
    res.statusCode = 400;
    throw new Error('Email has already exist!');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    email,
    password: hashedPassword,
    gender,
    fullname,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.users.insertOne(newUser);

  const createdUser = await db.users.findOne(
    { email },
    {
      projection: {
        password: 0,
      },
    }
  );
  res.status(201).json(createdUser);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await db.users.findOne({ email });

  if (!existingUser) {
    res.statusCode = 400;
    throw new Error('User does not exist');
  }

  const isMatchedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isMatchedPassword) {
    res.statusCode = 400;
    throw new Error('Email or password is not correct!');
  }

  const jwtPayload = {
    email: existingUser.email,
    fullname: existingUser.fullname,
    id: existingUser._id,
  };

  const accessToken = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({
    accessToken,
    message: 'Login successfully',
  });
});

const fetchCurrentUser = asyncHandler(async (req, res) => {
  const id = req.user.id;

  const currentUser = await db.users.findOne(
    { _id: new ObjectId(id) },
    {
      projection: { password: 0 },
    }
  );

  if (!currentUser) {
    res.status(401);
    throw new Error('Unauthorized user');
  }

  res.json(currentUser);
});

const AuthController = {
  register,
  login,
  fetchCurrentUser,
};

export default AuthController;
