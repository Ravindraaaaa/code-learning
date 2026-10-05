import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { getStudentLanguage, selectLanguage } from '../controllers/languageController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// GET /api/v1/student/dashboard
router.get('/dashboard', requireAuth, getDashboard);

// GET /api/v1/student/language
router.get('/language', requireAuth, getStudentLanguage);

// POST /api/v1/student/language (or PUT)
router.post('/language', requireAuth, selectLanguage);
router.put('/language', requireAuth, selectLanguage);

export default router;
