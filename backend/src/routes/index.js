import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import studentRoutes from './studentRoutes.js';
import languageRoutes from './languageRoutes.js';
import trackRoutes from './trackRoutes.js';
import topicRoutes from './topicRoutes.js';
import lessonRoutes from './lessonRoutes.js';
import assessmentRoutes from './assessmentRoutes.js';
import adminRoutes from './adminRoutes.js';
import roadmapRoutes from './roadmapRoutes.js';
import codeExecutionRoutes from './codeExecutionRoutes.js';
import debugArenaRoutes from './debugArenaRoutes.js';
import weeklyTestRoutes from './weeklyTestRoutes.js';
import competitionRoutes from './competitionRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';
import aiRoutes from './aiRoutes.js';
import batchRoutes from './batchRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/languages', languageRoutes);
router.use('/tracks', trackRoutes);
router.use('/topics', topicRoutes);
router.use('/lessons', lessonRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/student', studentRoutes);
router.use('/dashboard', studentRoutes);
router.use('/admin', adminRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/code', codeExecutionRoutes);
router.use('/debug-arena', debugArenaRoutes);
router.use('/tests', weeklyTestRoutes);
router.use('/competitions', competitionRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/ai', aiRoutes);
router.use('/batches', batchRoutes);

export default router;

