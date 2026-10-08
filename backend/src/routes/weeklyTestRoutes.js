import { Router } from 'express';
import { getActiveTests, getTest, submitTest, createTest } from '../controllers/weeklyTestController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/', requireAuth, getActiveTests);
router.get('/:id', requireAuth, getTest);
router.post('/:id/submit', requireAuth, submitTest);

// Admin
router.post('/', requireAuth, requireAdmin, createTest);

export default router;
