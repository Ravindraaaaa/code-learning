import { Router } from 'express';
import {
  createPurchaseOrder,
  verifyPayment,
  getMyPurchases,
  getPurchaseById,
  getAllPurchases,
} from '../controllers/purchaseController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';
import {
  validatePurchaseInput,
  validateCreateOrderInput,
  validateVerifyPaymentInput,
} from '../validators/purchaseValidators.js';

const router = Router();

// Student payment order & verification workflow
router.post(
  '/create-order',
  requireAuth,
  validatePurchaseInput,
  validateCreateOrderInput,
  createPurchaseOrder
);

router.post(
  '/verify-payment',
  requireAuth,
  validatePurchaseInput,
  validateVerifyPaymentInput,
  verifyPayment
);

// Fetch activated student purchases
router.get('/my-purchases', requireAuth, getMyPurchases);

// Admin platform purchases view
router.get('/all', requireAuth, requireAdmin, getAllPurchases);

// Specific purchase receipt lookup
router.get('/:id', requireAuth, getPurchaseById);

export default router;
