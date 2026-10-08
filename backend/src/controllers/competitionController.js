import { sendSuccess } from '../utils/apiResponse.js';
import * as compService from '../services/competitionService.js';

export const getCompetitions = async (req, res, next) => {
  try {
    const competitions = await compService.getActiveCompetitionsService();
    return sendSuccess(res, 200, 'Competitions retrieved', competitions);
  } catch (err) {
    next(err);
  }
};

export const getCompetition = async (req, res, next) => {
  try {
    const comp = await compService.getCompetitionByIdService(req.params.id, req.user?.id);
    return sendSuccess(res, 200, 'Competition retrieved', comp);
  } catch (err) {
    next(err);
  }
};

export const joinCompetition = async (req, res, next) => {
  try {
    const participation = await compService.joinCompetitionService(req.user.id, req.params.id);
    return sendSuccess(res, 200, 'Successfully joined competition', participation);
  } catch (err) {
    next(err);
  }
};

export const getQuestions = async (req, res, next) => {
  try {
    const questions = await compService.getCompetitionQuestionsService(req.params.id, req.user.id);
    return sendSuccess(res, 200, 'Questions retrieved', questions);
  } catch (err) {
    next(err);
  }
};

export const submitQuestion = async (req, res, next) => {
  try {
    const { language, code } = req.body;
    const result = await compService.submitCompetitionQuestionService(req.user.id, req.params.id, req.params.questionId, language, code);
    return sendSuccess(res, 200, 'Submission processed', result);
  } catch (err) {
    next(err);
  }
};

// Admin
export const createCompetition = async (req, res, next) => {
  try {
    const comp = await compService.createCompetitionService(req.body);
    return sendSuccess(res, 201, 'Competition created', comp);
  } catch (err) {
    next(err);
  }
};
