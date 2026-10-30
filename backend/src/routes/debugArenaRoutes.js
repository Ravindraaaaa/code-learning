import { Router } from 'express';
import {
  getChallenges,
  getChallenge,
  getChallengeAttempts,
  submitAttempt,
  createChallenge
} from '../controllers/debugArenaController.js';
import { requireAuth, optionalAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

router.get('/challenges', optionalAuth, getChallenges);
router.get('/challenges/:id', optionalAuth, getChallenge);
router.get('/challenges/:id/attempts', requireAuth, getChallengeAttempts);
router.get('/attempts', requireAuth, getChallengeAttempts);
router.post('/challenges/:id/submit', requireAuth, submitAttempt);

// Admin route
router.post('/challenges', requireAuth, requireAdmin, createChallenge);

export default router;
