import { Router } from 'express';
import { getCompetitions, getCompetition, joinCompetition, getQuestions, submitQuestion, createCompetition } from '../controllers/competitionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/', requireAuth, getCompetitions);
router.get('/:id', requireAuth, getCompetition);
router.post('/:id/join', requireAuth, joinCompetition);
router.get('/:id/questions', requireAuth, getQuestions);
router.post('/:id/questions/:questionId/submit', requireAuth, submitQuestion);

// Admin
router.post('/', requireAuth, requireAdmin, createCompetition);

export default router;
