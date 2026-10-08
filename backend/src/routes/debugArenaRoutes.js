import { Router } from 'express';
import { getChallenges, getChallenge, submitAttempt, createChallenge } from '../controllers/debugArenaController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/challenges', requireAuth, getChallenges);
router.get('/challenges/:id', requireAuth, getChallenge);
router.post('/challenges/:id/submit', requireAuth, submitAttempt);

// Admin route
router.post('/challenges', requireAuth, requireAdmin, createChallenge);

export default router;
