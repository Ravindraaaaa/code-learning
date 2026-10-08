import { sendSuccess } from '../utils/apiResponse.js';
import codeExecutionService from '../services/codeExecutionService.js';

export const executeCode = async (req, res, next) => {
  try {
    const { language, code, input } = req.body;
    if (!language || !code) {
      const error = new Error('Language and code are required');
      error.statusCode = 400;
      throw error;
    }
    const result = await codeExecutionService.execute(language, code, input);
    return sendSuccess(res, 200, 'Code executed successfully', result);
  } catch (error) {
    next(error);
  }
};

export const submitCode = async (req, res, next) => {
  try {
    const { language, code, questionId } = req.body;
    if (!language || !code) {
      const error = new Error('Language and code are required');
      error.statusCode = 400;
      throw error;
    }
    // In a real scenario, fetch hidden test cases for questionId
    const testCases = []; 
    const result = await codeExecutionService.submit(language, code, testCases);
    return sendSuccess(res, 200, 'Code submitted successfully', result);
  } catch (error) {
    next(error);
  }
};
