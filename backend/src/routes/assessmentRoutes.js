import { Router } from 'express';
import {
  getQuestions,
  submitAssessment,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/assessmentController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';
import { validateBody } from '../validators/validateRequest.js';
import { validateAssessmentSubmit, validateQuestionInput } from '../validators/assessmentValidators.js';

const router = Router();

// Student routes
router.get('/questions', requireAuth, getQuestions);
router.post('/submit', requireAuth, validateBody(validateAssessmentSubmit), submitAssessment);

// Admin routes (CRUD for questions)
router.post('/questions', requireAuth, requireAdmin, validateBody(validateQuestionInput), createQuestion);
router.put('/questions/:id', requireAuth, requireAdmin, validateBody(validateQuestionInput), updateQuestion);
router.delete('/questions/:id', requireAuth, requireAdmin, deleteQuestion);

export default router;
