import { Router } from 'express';
import { 
  executeCode, 
  submitCode, 
  getSubmissions, 
  getSubmissionById, 
  getSubmissionStats 
} from '../controllers/codeExecutionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Execution & Submission
router.post('/execute', requireAuth, executeCode);
router.post('/submit', requireAuth, submitCode);

// Submission History & Statistics (Strictly Authenticated Student Scope)
router.get('/submissions', requireAuth, getSubmissions);
router.get('/submissions/stats', requireAuth, getSubmissionStats);
router.get('/submissions/:id', requireAuth, getSubmissionById);

export default router;
