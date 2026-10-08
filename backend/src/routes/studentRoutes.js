import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { getStudentLanguage, selectLanguage } from '../controllers/languageController.js';
import { getStudentTrack, selectTrack } from '../controllers/trackController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/v1/student/dashboard
router.get('/dashboard', requireAuth, getDashboard);

// GET /api/v1/student/language
router.get('/language', requireAuth, getStudentLanguage);

// POST /api/v1/student/language (or PUT)
router.post('/language', requireAuth, selectLanguage);
router.put('/language', requireAuth, selectLanguage);

// GET /api/v1/student/track
router.get('/track', requireAuth, getStudentTrack);

// POST /api/v1/student/track (or PUT)
router.post('/track', requireAuth, selectTrack);
router.put('/track', requireAuth, selectTrack);

import { getProgress, getHeatmap } from '../controllers/progressController.js';

// GET /api/v1/student/progress
router.get('/progress', requireAuth, getProgress);

// GET /api/v1/student/heatmap
router.get('/heatmap', requireAuth, getHeatmap);

export default router;
