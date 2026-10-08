import Topic from '../models/Topic.js';

export const getAllPublishedTopics = async (query = {}) => {
  const filter = { status: 'published', ...query };
  const topics = await Topic.find(filter)
    .populate('track', 'name slug')
    .populate('language', 'name slug')
    .sort({ order: 1 });
  return topics;
};

export const getTopicByIdService = async (id) => {
  const topic = await Topic.findOne({ _id: id, status: 'published' })
    .populate('track', 'name slug')
    .populate('language', 'name slug');
  if (!topic) {
    const error = new Error('Topic not found');
    error.statusCode = 404;
    throw error;
  }
  return topic;
};

// Admin CRUD functions
export const createTopicService = async (topicData) => {
  const topic = new Topic(topicData);
  await topic.save();
  return topic;
};

export const updateTopicService = async (id, updateData) => {
  const topic = await Topic.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!topic) {
    const error = new Error('Topic not found');
    error.statusCode = 404;
    throw error;
  }
  return topic;
};

export const deleteTopicService = async (id) => {
  const topic = await Topic.findByIdAndDelete(id);
  if (!topic) {
    const error = new Error('Topic not found');
    error.statusCode = 404;
    throw error;
  }
  return topic;
};
