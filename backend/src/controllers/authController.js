import {
  registerStudent,
  loginStudent,
  loginAdmin,
  getStudentProfile,
  loginWithGoogle,
} from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const registeredUser = await registerStudent({ name, email, password });

    return sendSuccess(
      res,
      201,
      'Student account registered successfully',
      registeredUser
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authResult = await loginStudent({ email, password });

    return sendSuccess(
      res,
      200,
      'Student logged in successfully',
      authResult
    );
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authResult = await loginAdmin({ email, password });

    return sendSuccess(
      res,
      200,
      'Admin logged in successfully',
      authResult
    );
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { credential, token, email, name, googleId, code, redirectUri } = req.body;
    const authResult = await loginWithGoogle({ credential, token, email, name, googleId, code, redirectUri });

    return sendSuccess(
      res,
      200,
      'Google authentication successful',
      authResult
    );
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await getStudentProfile(req.user.id, req.user.email);

    return sendSuccess(
      res,
      200,
      'Current user retrieved successfully',
      user
    );
  } catch (error) {
    next(error);
  }
};
