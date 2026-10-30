import { sendSuccess } from '../utils/apiResponse.js';
import * as debugService from '../services/debugArenaService.js';

export const getChallenges = async (req, res, next) => {
  try {
    const { language, difficulty } = req.query;
    const userId = req.user?.id || req.user?._id;
    const challenges = await debugService.getChallengesService(language, difficulty, userId);
    return sendSuccess(res, 200, 'Challenges retrieved successfully', challenges);
  } catch (error) {
    next(error);
  }
};

export const getChallenge = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const challenge = await debugService.getChallengeByIdService(req.params.id, userId);
    return sendSuccess(res, 200, 'Challenge retrieved successfully', challenge);
  } catch (error) {
    next(error);
  }
};

export const getChallengeAttempts = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const challengeId = req.params.id || req.query.challengeId;
    const attempts = await debugService.getChallengeAttemptsService(userId, challengeId);
    return sendSuccess(res, 200, 'Attempts retrieved successfully', attempts);
  } catch (error) {
    next(error);
  }
};

export const submitAttempt = async (req, res, next) => {
  try {
    const { submittedCode, hintsUsed } = req.body;
    const userId = req.user?.id || req.user?._id;
    const attempt = await debugService.submitDebugAttemptService(userId, req.params.id, submittedCode, Number(hintsUsed) || 0);
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
