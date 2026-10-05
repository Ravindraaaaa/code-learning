import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { sendError } from '../utils/apiResponse.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled error on ${req.method} ${req.url}: ${err.message}`, err.stack);

  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || 'Internal Server Error';

  if (err.name === 'MongooseServerSelectionError' || err.name === 'MongoNetworkError') {
    statusCode = 503;
    message = 'Database service is currently unavailable. Please verify MongoDB is running.';
  }

  const errors = config.env === 'development' ? { stack: err.stack } : null;

  return sendError(res, statusCode, message, errors);
};
