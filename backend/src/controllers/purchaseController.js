import {
  createPurchaseOrderService,
  verifyAndActivatePaymentService,
  getMyPurchasesService,
  getPurchaseByIdService,
  getAllPurchasesService,
} from '../services/purchaseService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const createPurchaseOrder = async (req, res, next) => {
  try {
    const batchId = req.body.batchId || req.params.batchId;
    const userId = req.user.id || req.user._id;

    const orderData = await createPurchaseOrderService({
      userId,
      batchId,
    });

    return sendSuccess(res, 201, 'Payment order created successfully', orderData);
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { orderId, paymentId, signature, paymentMethod } = req.body;

    const verifiedPurchase = await verifyAndActivatePaymentService({
      userId,
      orderId,
      paymentId,
      signature,
      paymentMethod,
    });

    return sendSuccess(
      res,
      200,
      'Payment verified successfully with gateway. Content activated!',
      verifiedPurchase
    );
  } catch (error) {
    next(error);
  }
};

export const getMyPurchases = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const purchases = await getMyPurchasesService(userId);
    return sendSuccess(res, 200, 'Student activated purchases retrieved successfully', purchases);
  } catch (error) {
    next(error);
  }
};

export const getPurchaseById = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const purchase = await getPurchaseByIdService(
      req.params.id,
      userId,
      req.user.role
    );
    return sendSuccess(res, 200, 'Purchase details retrieved successfully', purchase);
  } catch (error) {
    next(error);
  }
};

export const getAllPurchases = async (req, res, next) => {
  try {
    const purchases = await getAllPurchasesService();
    return sendSuccess(res, 200, 'All platform purchases retrieved successfully', purchases);
  } catch (error) {
    next(error);
  }
};
