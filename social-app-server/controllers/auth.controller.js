import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';
import { ObjectId } from 'mongodb';
import * as yup from 'yup';

const register = asyncHandler(async (req, res) => {
  const { email, password, fullname, phoneNumber, gender, address } = req.body;

  // 2. Check duplicate
  const existingUser = await db.users.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('Email has already exist!');
  }

  // 3. Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   // 4. Create new user
  const newUser = {
    email,
    fullname,
    phoneNumber,
    gender,
    address,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 4. Add to database
  await db.users.insertOne(newUser);

  const createdUser = await db.users.findOne(
    { email },
    {
      projection: {
        password: 0,
      },
    }
  );

  // 5. Response to client
  res.status(201).json(createdUser);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  // 2. Check email
  const existingUser = await db.users.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error('Invalid credentials');
  }

  // 3. Check password
  const isMatchedPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isMatchedPassword) {
    res.status(400);
    throw new Error('Email or password is not valid');
  }

  // 4. Phát hành 1 tấm vé (accessToken) bằng JSON Web Token
  const payload = {
    id: existingUser._id,
    email: existingUser.email,
    fullname: existingUser.fullname,
  };

  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME, // 5 minutes
  });

  //  5. Response
  res.json({
    message: 'Login successfully',
    accessToken: token,
  });
});

const fetchCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const currentUser = await db.users.findOne(
    { _id: new ObjectId(userId) },
    {
      projection: {
        password: 0,
      },
    }
  );

  if (!currentUser) {
    res.status(401);
    throw new Error('Unauthorized, please try again!');
  }

  res.json(currentUser);
});

const AuthController = {
  register,
  login,
  fetchCurrentUser,
};

export default AuthController;
