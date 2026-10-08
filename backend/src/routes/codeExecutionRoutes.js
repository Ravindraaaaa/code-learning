import { Router } from 'express';
import { executeCode, submitCode } from '../controllers/codeExecutionController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/execute', requireAuth, executeCode);
router.post('/submit', requireAuth, submitCode);

export default router;
