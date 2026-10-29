import { Router } from 'express';
import { register, login, adminLogin, getMe, googleLogin } from '../controllers/authController.js';
import { validateBody } from '../validators/validateRequest.js';
import { validateRegisterInput, validateLoginInput } from '../validators/authValidators.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { sendSuccess } from '../utils/apiResponse.js';

const router = Router();

router.post('/register', validateBody(validateRegisterInput), register);
router.post('/login', validateBody(validateLoginInput), login);
router.post('/admin/login', validateBody(validateLoginInput), adminLogin);
router.post('/google', googleLogin);
router.get('/me', requireAuth, getMe);
router.get('/admin/verify', requireAuth, requireAdmin, (req, res) => {
  return sendSuccess(res, 200, 'Admin authorization verified', { user: req.user });
});

export default router;

