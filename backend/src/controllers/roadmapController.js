import { sendSuccess } from '../utils/apiResponse.js';
import * as roadmapService from '../services/roadmapService.js';

export const generateRoadmap = async (req, res, next) => {
  try {
    const roadmap = await roadmapService.generateRoadmapService(req.user.id, req.body);
    return sendSuccess(res, 201, 'Personalized roadmap generated successfully', roadmap);
  } catch (error) {
    next(error);
  }
};

export const getMyRoadmap = async (req, res, next) => {
  try {
    const roadmap = await roadmapService.getStudentRoadmapService(req.user.id);
    return sendSuccess(res, 200, 'Roadmap retrieved successfully', roadmap);
  } catch (error) {
    next(error);
  }
};
