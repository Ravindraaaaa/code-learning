import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, getLeaderboard);

export default router;
