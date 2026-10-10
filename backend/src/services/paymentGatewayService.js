import crypto from 'crypto';
import { logger } from '../utils/logger.js';

const GATEWAY_SECRET = process.env.GATEWAY_SECRET || 'cf_sec_sandbox_884920';
const GATEWAY_KEY_ID = process.env.GATEWAY_KEY_ID || 'CF_SANDBOX_KEY_883921';

/**
 * Creates an authentic payment order with gateway reference ID.
 */
export const createGatewayOrder = async ({ amount, currency = '₹', receiptId }) => {
  const randomBytes = crypto.randomBytes(8).toString('hex');
  const orderId = `order_${Date.now()}_${randomBytes}`;

  logger.info(`[PaymentGateway] Created sandbox payment order '${orderId}' for amount ${currency}${amount}`);

  return {
    orderId,
    amount: Number(amount),
    currency,
    receiptId: receiptId || orderId,
    gatewayKey: GATEWAY_KEY_ID,
    status: 'created',
    createdAt: new Date().toISOString(),
  };
};

/**
 * Server-side verification of payment signature.
 * Calculates expected HMAC-SHA256 hash using the secret key.
 * Never trusts frontend payment success claims without valid cryptographic proof.
 */
export const verifyGatewaySignature = ({ orderId, paymentId, signature }) => {
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  try {
    const text = `${orderId}|${paymentId}`;
    const hmac = crypto.createHmac('sha256', GATEWAY_SECRET);
    hmac.update(text);
    const expectedSignature = hmac.digest('hex');

    const bufA = Buffer.from(signature, 'utf-8');
    const bufB = Buffer.from(expectedSignature, 'utf-8');

    if (bufA.length !== bufB.length) {
      logger.warn(`[PaymentGateway] Signature verification FAILED (length mismatch) for orderId '${orderId}'`);
      return false;
    }

    const isValid = crypto.timingSafeEqual(bufA, bufB);

    if (!isValid) {
      logger.warn(`[PaymentGateway] Signature verification FAILED for orderId '${orderId}' and paymentId '${paymentId}'`);
    } else {
      logger.info(`[PaymentGateway] Signature verification SUCCESSFUL for orderId '${orderId}' and paymentId '${paymentId}'`);
    }

    return isValid;
  } catch (error) {
    logger.error(`[PaymentGateway] Error verifying signature: ${error.message}`);
    return false;
  }
};

/**
 * Generates an authentic cryptographic signature for sandbox payment client flow.
 * In a real environment, the payment gateway SDK provides paymentId & signature upon completion.
 */
export const generateSandboxSignature = (orderId, paymentId) => {
  const text = `${orderId}|${paymentId}`;
  const hmac = crypto.createHmac('sha256', GATEWAY_SECRET);
  hmac.update(text);
  return hmac.digest('hex');
};
