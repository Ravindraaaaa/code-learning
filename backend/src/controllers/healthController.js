import { getSystemHealth } from '../services/healthService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const checkHealth = (req, res, next) => {
  try {
    const healthData = getSystemHealth();
    return sendSuccess(res, 200, 'CodeForge API is operational', healthData);
  } catch (error) {
    next(error);
  }
};
