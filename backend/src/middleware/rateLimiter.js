import rateLimit from 'express-rate-limit';

/**
 * Global API Rate Limiter
 * 300 requests per 15 minutes per IP
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
    error: 'TOO_MANY_REQUESTS'
  }
});

/**
 * Strict Auth Rate Limiter
 * 10 login / registration attempts per 15 minutes per IP
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.',
    error: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});

/**
 * Code Execution & Arena Sandbox Rate Limiter
 * 15 executions per 1 minute per IP
 */
export const codeExecutionRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Code execution rate limit exceeded. Please wait a minute before submitting again.',
    error: 'EXECUTION_RATE_LIMIT_EXCEEDED'
  }
});

/**
 * AI Assistant Rate Limiter
 * 10 requests per 1 minute per IP
 */
export const aiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'AI Assistant rate limit exceeded. Please wait a minute before asking another question.',
    error: 'AI_RATE_LIMIT_EXCEEDED'
  }
});
