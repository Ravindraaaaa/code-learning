/**
 * Purchase input validation middleware
 * Enforces zero storage and zero transmission of sensitive financial credentials.
 */
export const validatePurchaseInput = (req, res, next) => {
  const body = req.body || {};
  
  // List of forbidden sensitive credentials that must never be sent or stored
  const FORBIDDEN_FIELDS = [
    'cardNumber',
    'card_number',
    'cardNo',
    'cvv',
    'cvc',
    'upiPin',
    'upi_pin',
    'bankingPassword',
    'banking_password',
    'pin',
    'accountPassword'
  ];

  const detectedForbidden = FORBIDDEN_FIELDS.filter((field) => body[field] !== undefined);

  if (detectedForbidden.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Security Policy Violation: Sensitive credentials (${detectedForbidden.join(', ')}) must NEVER be transmitted or stored on CodeForge servers.`,
      error: 'FORBIDDEN_CREDENTIALS_PROVIDED'
    });
  }

  next();
};

export const validateCreateOrderInput = (req, res, next) => {
  const body = req.body || {};
  const batchId = body.batchId || req.params.batchId || req.params.id;

  if (!batchId) {
    return res.status(400).json({
      success: false,
      message: 'Batch ID is required to create a payment order.',
    });
  }

  next();
};

export const validateVerifyPaymentInput = (req, res, next) => {
  const body = req.body || {};
  const { orderId, paymentId, signature } = body;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({
      success: false,
      message: 'Payment verification requires orderId, paymentId, and gateway signature.',
      error: 'MISSING_VERIFICATION_PAYLOAD'
    });
  }

  next();
};
