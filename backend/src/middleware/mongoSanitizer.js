/**
 * MongoDB Query Injection Protection Middleware
 * Recursively inspects req.body, req.query, and req.params
 * Removes any object keys starting with '$' or containing '.'
 */
const sanitize = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitize);
  }

  const cleanObj = {};
  for (const key of Object.keys(obj)) {
    // Strip keys starting with '$' (MongoDB operators) or containing '.'
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }
    cleanObj[key] = sanitize(obj[key]);
  }

  return cleanObj;
};

export const mongoSanitizer = (req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
};

export default mongoSanitizer;
