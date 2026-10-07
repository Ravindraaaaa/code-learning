import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import studentRoutes from './studentRoutes.js';
import languageRoutes from './languageRoutes.js';
import trackRoutes from './trackRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/languages', languageRoutes);
router.use('/tracks', trackRoutes);
router.use('/student', studentRoutes);
router.use('/dashboard', studentRoutes);
router.use('/admin', adminRoutes);

export default router;

