import { Router } from 'express';
import { generateRoadmap, getMyRoadmap } from '../controllers/roadmapController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/generate', requireAuth, generateRoadmap);
router.get('/my-roadmap', requireAuth, getMyRoadmap);

export default router;
