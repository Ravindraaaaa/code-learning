import { Router } from 'express';
import {
  getAllBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch
} from '../controllers/batchController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Public / Student endpoints
router.get('/', getAllBatches);
router.get('/:id', getBatchById);

// Admin endpoints
router.post('/', requireAuth, requireAdmin, createBatch);
router.put('/:id', requireAuth, requireAdmin, updateBatch);
router.delete('/:id', requireAuth, requireAdmin, deleteBatch);

export default router;
