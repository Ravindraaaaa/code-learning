import { verifyToken } from '../utils/jwt.js';
import { sendError } from '../utils/apiResponse.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Authentication token is required');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id || decoded._id;
    req.user = {
      ...decoded,
      _id: userId,
      id: userId
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Token has expired. Please log in again.');
    }
    return sendError(res, 401, 'Invalid authentication token');
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const userId = decoded.id || decoded._id;
    req.user = {
      ...decoded,
      _id: userId,
      id: userId
    };
  } catch {
    // If token is invalid or expired, continue without req.user
  }

  next();
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return sendError(res, 403, `Access denied. Requires ${role} privileges.`);
    }
    next();
  };
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return sendError(res, 401, 'Authentication token is required');
  }

  if (req.user.role !== 'admin') {
    return sendError(res, 403, 'Access denied. Requires admin privileges.');
  }

  next();
};
