import { sendSuccess } from '../utils/apiResponse.js';
import * as debugService from '../services/debugArenaService.js';

export const getChallenges = async (req, res, next) => {
  try {
    const { language, difficulty } = req.query;
    const challenges = await debugService.getChallengesService(language, difficulty);
    return sendSuccess(res, 200, 'Challenges retrieved successfully', challenges);
  } catch (error) {
    next(error);
  }
};

export const getChallenge = async (req, res, next) => {
  try {
    const challenge = await debugService.getChallengeByIdService(req.params.id);
    return sendSuccess(res, 200, 'Challenge retrieved successfully', challenge);
  } catch (error) {
    next(error);
  }
};

export const submitAttempt = async (req, res, next) => {
  try {
    const { submittedCode } = req.body;
    const attempt = await debugService.submitDebugAttemptService(req.user.id, req.params.id, submittedCode);
    return sendSuccess(res, 201, 'Attempt submitted and processed', attempt);
  } catch (error) {
    next(error);
  }
};

export const createChallenge = async (req, res, next) => {
  try {
    const challenge = await debugService.createChallengeService(req.body);
    return sendSuccess(res, 201, 'Challenge created successfully', challenge);
  } catch (error) {
    next(error);
  }
};
