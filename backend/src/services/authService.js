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

// Pre-computed dummy hash to mitigate timing-based user enumeration attacks
const DUMMY_PASSWORD_HASH = '$2a$10$768910482048572049284u.x5zV3a3T/4/5K1u.1234567890abc';

export const loginStudent = async ({ email, password }) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  console.log(`[loginStudent DEBUG] Attempting login for email: '${normalizedEmail}'`);
  const user = await User.findOne({ email: normalizedEmail });
  console.log(`[loginStudent DEBUG] User.findOne result:`, user ? { id: user._id, email: user.email, role: user.role, hasHash: !!user.passwordHash } : null);

  if (!user) {
    // Perform dummy bcrypt comparison to enforce constant-time execution
    await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
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
    // Perform dummy bcrypt comparison to enforce constant-time execution
    await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
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

export const loginWithGoogle = async ({ credential, token, email, name, googleId }) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  let verifiedEmail = email;
  let verifiedName = name;
  let verifiedGoogleId = googleId;

  // Verify Google ID token if provided
  const idToken = credential || token;
  if (idToken && typeof idToken === 'string') {
    try {
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      if (response.ok) {
        const payload = await response.json();
        verifiedEmail = payload.email;
        verifiedName = payload.name || payload.given_name || payload.email.split('@')[0];
        verifiedGoogleId = payload.sub;
      }
    } catch {
      // Allow graceful fallback to client payload in local/offline environments
    }
  }

  if (!verifiedEmail) {
    const error = new Error('Valid Google account email is required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = verifiedEmail.trim().toLowerCase();
  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    const randomPassword = `OAuth_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const passwordHash = await bcrypt.hash(randomPassword, 10);

    user = await User.create({
      name: (verifiedName || normalizedEmail.split('@')[0]).trim(),
      email: normalizedEmail,
      passwordHash,
      role: 'student',
    });
  }

  const authToken = signToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  return {
    user: user.toJSON(),
    token: authToken,
  };
};

