import { registerStudent, loginStudent, loginAdmin, getStudentProfile } from '../services/authService.js';
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

export const getMe = async (req, res, next) => {
  try {
    const user = await getStudentProfile(req.user.id);

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

