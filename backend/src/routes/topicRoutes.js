import { Router } from 'express';
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers/topicController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';
import { validateBody } from '../validators/validateRequest.js';
import { validateTopicInput } from '../validators/topicValidators.js';

const router = Router();

// Student routes (View topics)
router.get('/', requireAuth, getTopics);
router.get('/:id', requireAuth, getTopicById);

// Admin routes (CRUD)
router.post('/', requireAuth, requireAdmin, validateBody(validateTopicInput), createTopic);
router.put('/:id', requireAuth, requireAdmin, validateBody(validateTopicInput), updateTopic);
router.delete('/:id', requireAuth, requireAdmin, deleteTopic);

export default router;
