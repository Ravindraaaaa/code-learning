import { sendSuccess } from '../utils/apiResponse.js';
import * as topicService from '../services/topicService.js';

export const getTopics = async (req, res, next) => {
  try {
    const { track, language } = req.query;
    const filter = {};
    if (track) filter.track = track;
    if (language) filter.language = language;
    
    const topics = await topicService.getAllPublishedTopics(filter);
    return sendSuccess(res, 200, 'Topics retrieved successfully', topics);
  } catch (error) {
    next(error);
  }
};

export const getTopicById = async (req, res, next) => {
  try {
    const topic = await topicService.getTopicByIdService(req.params.id);
    return sendSuccess(res, 200, 'Topic retrieved successfully', topic);
  } catch (error) {
    next(error);
  }
};

// Admin CRUD controllers
export const createTopic = async (req, res, next) => {
  try {
    const topic = await topicService.createTopicService(req.body);
    return sendSuccess(res, 201, 'Topic created successfully', topic);
  } catch (error) {
    next(error);
  }
};

export const updateTopic = async (req, res, next) => {
  try {
    const topic = await topicService.updateTopicService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Topic updated successfully', topic);
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (req, res, next) => {
  try {
    await topicService.deleteTopicService(req.params.id);
    return sendSuccess(res, 200, 'Topic deleted successfully');
  } catch (error) {
    next(error);
  }
};
