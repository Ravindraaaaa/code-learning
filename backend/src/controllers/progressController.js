import { sendSuccess } from '../utils/apiResponse.js';
import { getStudentProgressService, getStudentHeatmapService } from '../services/progressService.js';

export const getProgress = async (req, res, next) => {
  try {
    const progress = await getStudentProgressService(req.user.id);
    return sendSuccess(res, 200, 'Student progress retrieved successfully', progress);
  } catch (error) {
    next(error);
  }
};

export const getHeatmap = async (req, res, next) => {
  try {
    const heatmapData = await getStudentHeatmapService(req.user.id);
    return sendSuccess(res, 200, 'Student heatmap data retrieved successfully', heatmapData);
  } catch (error) {
    next(error);
  }
};
