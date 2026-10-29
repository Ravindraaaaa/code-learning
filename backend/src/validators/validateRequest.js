import { validationResult } from 'express-validator';
import { sendError } from '../utils/apiResponse.js';

export const validateBody = (validatorFn) => {
  if (Array.isArray(validatorFn)) {
    return async (req, res, next) => {
      for (const validation of validatorFn) {
        await validation.run(req);
      }
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const formattedErrors = {};
        result.array().forEach((err) => {
          if (err.path && !formattedErrors[err.path]) {
            formattedErrors[err.path] = err.msg;
          }
        });
        return sendError(res, 400, 'Validation failed', formattedErrors);
      }
      next();
    };
  }

  return (req, res, next) => {
    const { isValid, errors } = validatorFn(req.body);

    if (!isValid) {
      return sendError(res, 400, 'Validation failed', errors);
    }

    next();
  };
};

export const validateQuery = (validatorFn) => {
  return (req, res, next) => {
    const { isValid, errors } = validatorFn(req.query);

    if (!isValid) {
      return sendError(res, 400, 'Invalid query parameters', errors);
    }

    next();
  };
};
