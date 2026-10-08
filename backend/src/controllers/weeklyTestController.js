import { sendSuccess } from '../utils/apiResponse.js';
import * as testService from '../services/weeklyTestService.js';

export const getActiveTests = async (req, res, next) => {
  try {
    const tests = await testService.getActiveTestsService();
    return sendSuccess(res, 200, 'Tests retrieved successfully', tests);
  } catch (error) {
    next(error);
  }
};

export const getTest = async (req, res, next) => {
  try {
    const test = await testService.getTestByIdService(req.params.id);
    return sendSuccess(res, 200, 'Test retrieved successfully', test);
  } catch (error) {
    next(error);
  }
};

export const submitTest = async (req, res, next) => {
  try {
    const { answers, startedAt } = req.body;
    const result = await testService.submitTestService(req.user.id, req.params.id, answers, startedAt);
    return sendSuccess(res, 201, 'Test submitted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const createTest = async (req, res, next) => {
  try {
    const test = await testService.createTestService(req.body);
    return sendSuccess(res, 201, 'Test created successfully', test);
  } catch (error) {
    next(error);
  }
};
