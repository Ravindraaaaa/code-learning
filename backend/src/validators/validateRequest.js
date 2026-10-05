import { sendError } from '../utils/apiResponse.js';

export const validateBody = (validatorFn) => {
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
