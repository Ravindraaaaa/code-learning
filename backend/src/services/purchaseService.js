import Purchase from '../models/Purchase.js';
import Batch from '../models/Batch.js';
import { createNotification } from './notificationService.js';
import {
  createGatewayOrder,
  verifyGatewaySignature,
  generateSandboxSignature,
} from './paymentGatewayService.js';
import { logger } from '../utils/logger.js';

/**
 * Step 1: Initiates a payment order with the gateway.
 * Freezes current batch.price into immutable amountPaid and sets status to 'pending'.
 */
export const createPurchaseOrderService = async ({ userId, batchId }) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  if (batch.status === 'inactive' || batch.status === 'archived') {
    const error = new Error(`Cannot purchase batch with status '${batch.status}'`);
    error.statusCode = 400;
    throw error;
  }

  // Check if student already has a completed purchase for this batch
  const existingCompleted = await Purchase.findOne({
    user: userId,
    batch: batch._id,
    paymentStatus: 'completed',
  });

  if (existingCompleted) {
    const error = new Error('Student is already enrolled in this batch.');
    error.statusCode = 400;
    throw error;
  }

  // Freeze current batch price into amountPaid
  const amountPaid = Number(batch.price);
  const currency = batch.currency || '₹';

  // Create gateway order
  const gatewayOrder = await createGatewayOrder({
    amount: amountPaid,
    currency,
    receiptId: String(batch._id),
  });

  // Create purchase record in 'pending' status
  const purchase = await Purchase.create({
    user: userId,
    batch: batch._id,
    orderId: gatewayOrder.orderId,
    amountPaid,
    currency,
    paymentStatus: 'pending',
    purchasedAt: new Date(),
  });

  // Generate sandbox helper signature for client testing convenience
  const sandboxSignature = generateSandboxSignature(gatewayOrder.orderId, `pay_${gatewayOrder.orderId.replace('order_', '')}`);

  return {
    purchaseId: purchase._id,
    orderId: gatewayOrder.orderId,
    amount: amountPaid,
    currency,
    gatewayKey: gatewayOrder.gatewayKey,
    batchName: batch.name,
    // Provide a sample valid sandbox payment ID and signature for client sandbox checkout
    sandboxPaymentId: `pay_${gatewayOrder.orderId.replace('order_', '')}`,
    sandboxSignature,
  };
};

/**
 * Step 2: Server-side payment verification & content activation.
 * Frontend payment claims are NOT trusted. Verification must pass with gateway signature.
 */
export const verifyAndActivatePaymentService = async ({
  userId,
  orderId,
  paymentId,
  signature,
  paymentMethod = 'GATEWAY_SANDBOX',
}) => {
  const purchase = await Purchase.findOne({ orderId, user: userId });

  if (!purchase) {
    const error = new Error('Payment order not found or unauthorized.');
    error.statusCode = 404;
    throw error;
  }

  // If already verified and completed, return existing activated purchase
  if (purchase.paymentStatus === 'completed') {
    return purchase.populate('batch');
  }

  // Mandatory Server-Side Gateway Verification
  const isSignatureValid = verifyGatewaySignature({ orderId, paymentId, signature });

  if (!isSignatureValid) {
    purchase.paymentStatus = 'failed';
    purchase.paymentId = paymentId || null;
    purchase.paymentSignature = signature || null;
    await purchase.save();

    logger.warn(`[PurchaseService] Payment verification FAILED for user ${userId}, order ${orderId}. Content NOT activated.`);
    
    const error = new Error('Server-side payment verification failed. Gateway signature mismatch.');
    error.statusCode = 400;
    error.code = 'PAYMENT_VERIFICATION_FAILED';
    throw error;
  }

  // Signature valid -> Mark completed and ACTIVATE content
  purchase.paymentStatus = 'completed';
  purchase.paymentId = paymentId;
  purchase.transactionId = paymentId;
  purchase.paymentSignature = signature;
  purchase.paymentMethod = paymentMethod || 'GATEWAY_SANDBOX';
  purchase.verifiedAt = new Date();

  await purchase.save();
  await purchase.populate('batch');

  // Trigger Notification
  try {
    await createNotification({
      userId,
      type: 'purchase_confirmation',
      title: 'Purchase Confirmed!',
      message: `Your payment of ${purchase.currency}${purchase.amountPaid} for batch "${purchase.batch?.name || 'Cohort'}" was successfully verified. Content activated!`,
      data: {
        purchaseId: purchase._id,
        orderId: purchase.orderId,
        amountPaid: purchase.amountPaid,
        batchId: purchase.batch?._id || purchase.batch
      }
    });
  } catch (err) {
    // Non-blocking notification logging
  }

  logger.info(`[PurchaseService] Payment VERIFIED & ACTIVATED for user ${userId}, order ${orderId}, payment ${paymentId}. Amount: ${purchase.currency}${purchase.amountPaid}`);

  return purchase;
};

/**
 * Retrieves all verified & completed purchases for a student (activated content).
 */
export const getMyPurchasesService = async (userId) => {
  const purchases = await Purchase.find({ user: userId, paymentStatus: 'completed' })
    .populate('batch')
    .sort({ purchasedAt: -1 });
  return purchases;
};

/**
 * Retrieves specific purchase receipt with authorization checks.
 */
export const getPurchaseByIdService = async (purchaseId, userId, userRole) => {
  const purchase = await Purchase.findById(purchaseId)
    .populate('batch')
    .populate('user', 'name email');

  if (!purchase) {
    const error = new Error('Purchase record not found');
    error.statusCode = 404;
    throw error;
  }

  const purchaseUserId = purchase.user?._id
    ? purchase.user._id.toString()
    : (purchase.user ? String(purchase.user) : '');

  const requestingUserId = String(userId);

  if (userRole !== 'admin' && purchaseUserId !== requestingUserId) {
    const error = new Error('Access denied. You do not have permission to view this purchase receipt.');
    error.statusCode = 403;
    throw error;
  }

  return purchase;
};

/**
 * Admin endpoint to list all platform purchases.
 */
export const getAllPurchasesService = async () => {
  const purchases = await Purchase.find()
    .populate('batch')
    .populate('user', 'name email role')
    .sort({ purchasedAt: -1 });
  return purchases;
};
