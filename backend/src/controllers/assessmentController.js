import { sendSuccess } from '../utils/apiResponse.js';
import * as assessmentService from '../services/assessmentService.js';

export const getQuestions = async (req, res, next) => {
  try {
    const { track, language } = req.query;
    const filter = {};
    if (track) filter.track = track;
    if (language) filter.language = language;
    
    if (!track && !language) {
      const error = new Error('Please specify a track or language ID');
      error.statusCode = 400;
      throw error;
    }

    const questions = await assessmentService.getQuestionsForAssessment(filter);
    return sendSuccess(res, 200, 'Questions retrieved successfully', questions);
  } catch (error) {
    next(error);
  }
};

export const submitAssessment = async (req, res, next) => {
  try {
    const submission = await assessmentService.submitAssessment(req.user.id, req.body);
    return sendSuccess(res, 201, 'Assessment submitted successfully', submission);
  } catch (error) {
    next(error);
  }
};

// Admin CRUD controllers
export const createQuestion = async (req, res, next) => {
  try {
    const question = await assessmentService.createQuestionService(req.body);
    return sendSuccess(res, 201, 'Question created successfully', question);
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req, res, next) => {
  try {
    const question = await assessmentService.updateQuestionService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Question updated successfully', question);
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    await assessmentService.deleteQuestionService(req.params.id);
    return sendSuccess(res, 200, 'Question deleted successfully');
  } catch (error) {
    next(error);
  }
};
