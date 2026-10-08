import { Router } from 'express';
import {
  getLessonsByTopic,
  getLessonById,
  markLessonCompleted,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';
import { validateBody } from '../validators/validateRequest.js';
import { validateLessonInput } from '../validators/lessonValidators.js';

const router = Router();

// Student routes
router.get('/topic/:topicId', requireAuth, getLessonsByTopic);
router.get('/:id', requireAuth, getLessonById);
router.post('/:id/complete', requireAuth, markLessonCompleted);

// Admin routes (CRUD)
router.post('/', requireAuth, requireAdmin, validateBody(validateLessonInput), createLesson);
router.put('/:id', requireAuth, requireAdmin, validateBody(validateLessonInput), updateLesson);
router.delete('/:id', requireAuth, requireAdmin, deleteLesson);

export default router;
