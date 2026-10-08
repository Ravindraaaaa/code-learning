import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { askQuestion } from '../controllers/aiController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Rate limiting for AI endpoints: 10 requests per 15 minutes per IP
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    status: 'error',
    message: 'Too many requests to the AI Assistant. Please take a break and try again later.'
  }
});

// POST /api/v1/ai/ask
router.post('/ask', requireAuth, aiLimiter, askQuestion);

export default router;
