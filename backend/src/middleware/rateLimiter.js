import rateLimit from 'express-rate-limit';

/**
 * Global API Rate Limiter
 * 300 requests per 15 minutes per IP
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 300 : 5000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    error: 'TOO_MANY_REQUESTS'
  }
});

/**
 * Strict Auth Rate Limiter
 * 10 login / registration attempts per 15 minutes per IP (relaxed in development)
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 15 : 1000,
  skip: () => process.env.NODE_ENV === 'test',
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
  max: process.env.NODE_ENV === 'production' ? 15 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Code execution rate limit exceeded. Please wait a minute before submitting again.',
    error: 'EXECUTION_RATE_LIMIT_EXCEEDED'
  }
});

/**
 * AI Assistant Interaction Rate Limiter
 * 10 prompts per 1 minute per IP
 */
export const aiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.NODE_ENV === 'production' ? 10 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'AI assistant query rate limit exceeded. Please wait a minute.',
    error: 'AI_RATE_LIMIT_EXCEEDED'
  }
});
