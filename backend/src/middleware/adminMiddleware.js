import { sendError } from '../utils/apiResponse.js';

/**
 * Admin Authorization Middleware
 * Verifies that the authenticated user possesses the 'admin' role.
 * Must be preceded by requireAuth in the middleware chain.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return sendError(res, 401, 'Authentication token is required');
  }

  if (req.user.role !== 'admin') {
    return sendError(res, 403, 'Access denied. Requires admin privileges.');
  }

  next();
};

export default requireAdmin;
