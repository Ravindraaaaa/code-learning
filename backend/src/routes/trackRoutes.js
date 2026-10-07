import { Router } from 'express';
import { getTracks, getTrackDetails } from '../controllers/trackController.js';

const router = Router();

// GET /api/v1/tracks
router.get('/', getTracks);

// GET /api/v1/tracks/:slug
router.get('/:slug', getTrackDetails);

export default router;
