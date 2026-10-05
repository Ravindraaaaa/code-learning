import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { signToken } from '../utils/jwt.js';
import { isDBConnected } from '../config/db.js';

export const registerStudent = async ({ name, email, password }) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('An account with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'student',
  });

  return newUser.toJSON();
};

export const loginStudent = async ({ email, password }) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (user.role !== 'student') {
    const error = new Error('Access denied. This login portal is reserved for students.');
    error.statusCode = 403;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user: user.toJSON(),
    token,
  };
};

export const loginAdmin = async ({ email, password }) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  if (user.role !== 'admin') {
    const error = new Error('Access denied. This login portal is reserved for administrators.');
    error.statusCode = 403;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user: user.toJSON(),
    token,
  };
};

export const getUserProfile = async (userId) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User account not found');
    error.statusCode = 404;
    throw error;
  }

  return user.toJSON();
};

export const getStudentProfile = getUserProfile;

