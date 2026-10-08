import {
  getAllBatchesService,
  getBatchByIdService,
  createBatchService,
  updateBatchService,
  deleteBatchService
} from '../services/batchService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getAllBatches = async (req, res, next) => {
  try {
    const batches = await getAllBatchesService(req.query);
    return sendSuccess(res, 200, 'Batches retrieved successfully', batches);
  } catch (error) {
    next(error);
  }
};

export const getBatchById = async (req, res, next) => {
  try {
    const batch = await getBatchByIdService(req.params.id);
    return sendSuccess(res, 200, 'Batch details retrieved', batch);
  } catch (error) {
    next(error);
  }
};

export const createBatch = async (req, res, next) => {
  try {
    const batch = await createBatchService(req.body);
    return sendSuccess(res, 201, 'Batch created successfully', batch);
  } catch (error) {
    next(error);
  }
};

export const updateBatch = async (req, res, next) => {
  try {
    const batch = await updateBatchService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Batch updated successfully', batch);
  } catch (error) {
    next(error);
  }
};

export const deleteBatch = async (req, res, next) => {
  try {
    const result = await deleteBatchService(req.params.id);
    return sendSuccess(res, 200, 'Batch deleted successfully', result);
  } catch (error) {
    next(error);
  }
};
