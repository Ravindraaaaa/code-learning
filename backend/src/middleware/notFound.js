import { sendError } from '../utils/apiResponse.js';

export const notFoundHandler = (req, res, next) => {
  sendError(res, 404, `Resource not found: ${req.method} ${req.originalUrl}`);
};
