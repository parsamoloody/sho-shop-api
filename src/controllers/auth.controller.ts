import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import crypto from 'crypto'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongoose';
import { sendResetEmail } from '../utils/email';
dotenv.config()
const SECRET = process.env.AUTH_SECRET_16_TO_HEX;

if (!SECRET || SECRET.length !== 32) {
  throw new Error('AUTH_SECRET_256 key not set or incorrect');
}

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    const exists = await UserModel.findOne({ email: email });
    if (exists) return res.status(400).json({ message: 'email already taken' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashed,
      role: 'user',
      addresses: [],
      wishlist: [],
      cart: [],
      orderHistory: [],
    })
    newUser.save()
      .then((res) => {
        console.log("user data successfully", res)
        newUserId = (res._id as any).toString()
      })
      .catch((err) => {
        console.log("error on store data to dbb", err)
      })
    let newUserId = await (newUser._id as ObjectId).toString()
    const token = jwt.sign({ id: newUserId, email: newUser.email, role: newUser.role, name: newUser.name }, SECRET, { expiresIn: '1h' });
    const a = res.status(201).json({ message: 'User created', token });
    return a
  } catch (e: any) {
    res.status(500).json({ message: 'Internal server error' })
    throw new Error('error signup')
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found, please signup' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });
    const id = user.id.toString()
    const token = jwt.sign({ id: id, email: user.email, role: user.role, name: user.name }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (e: any) {
    res.status(500).json({ message: 'Internal server error' })
  }
};

export const me = (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    res.status(200).json({ user });
  }
  catch {
    res.status(500).json({ message: "Internal server errorr" })
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ message: 'No user with that email' });

  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  user.resetToken = hashedToken;
  user.resetTokenExpire = Date.now() + 3600000;
  await user.save();

  const resetLink = `http://yourfrontend.com/auth/reset-password/${token}`;

  await sendResetEmail(user.email, resetLink);

  res.json({ message: 'Password reset email sent' });
}