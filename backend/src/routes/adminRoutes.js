import { Router } from 'express';
import { getAdminOverview } from '../controllers/adminController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = Router();

// Protect all admin endpoints with JWT authentication and Admin role enforcement
router.use(requireAuth, requireAdmin);

router.get('/overview', getAdminOverview);

export default router;
