import { sendSuccess } from '../utils/apiResponse.js';
import * as lessonService from '../services/lessonService.js';

export const getLessonsByTopic = async (req, res, next) => {
  try {
    const lessons = await lessonService.getLessonsByTopicService(req.params.topicId);
    return sendSuccess(res, 200, 'Lessons retrieved successfully', lessons);
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const lesson = await lessonService.getLessonByIdService(req.params.id, userId);
    return sendSuccess(res, 200, 'Lesson retrieved successfully', lesson);
  } catch (error) {
    next(error);
  }
};

export const markLessonCompleted = async (req, res, next) => {
  try {
    const progress = await lessonService.markLessonCompletedService(req.user.id, req.params.id);
    return sendSuccess(res, 200, 'Lesson marked as completed', progress);
  } catch (error) {
    next(error);
  }
};

// Admin CRUD controllers
export const createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLessonService(req.body);
    return sendSuccess(res, 201, 'Lesson created successfully', lesson);
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLessonService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Lesson updated successfully', lesson);
  } catch (error) {
    next(error);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLessonService(req.params.id);
    return sendSuccess(res, 200, 'Lesson deleted successfully');
  } catch (error) {
    next(error);
  }
};
