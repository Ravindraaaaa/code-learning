import Lesson from '../models/Lesson.js';
import LessonProgress from '../models/LessonProgress.js';

import { updateRoadmapProgressService } from './roadmapService.js';

export const getLessonsByTopicService = async (topicId) => {
  return await Lesson.find({ topic: topicId, status: 'published' })
    .populate('topic', 'title')
    .sort({ order: 1 });
};

export const getLessonByIdService = async (id, userId = null) => {
  const lesson = await Lesson.findOne({ _id: id, status: 'published' }).populate('topic', 'title');
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }
  
  let isCompleted = false;
  if (userId) {
    const progress = await LessonProgress.findOne({ user: userId, lesson: id });
    if (progress) isCompleted = true;
  }

  return { ...lesson.toJSON(), isCompleted };
};

export const markLessonCompletedService = async (userId, lessonId) => {
  // Ensure lesson exists
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }

  // Attempt to save progress, ignore duplicate errors
  try {
    const progress = new LessonProgress({ user: userId, lesson: lessonId });
    await progress.save();
    
    // Update roadmap progress
    await updateRoadmapProgressService(userId, lessonId);
    
    return progress;
  } catch (err) {
    // 11000 is MongoDB duplicate key error code
    if (err.code === 11000) {
      return await LessonProgress.findOne({ user: userId, lesson: lessonId });
    }
    throw err;
  }
};

export const createLessonService = async (lessonData) => {
  const lesson = new Lesson(lessonData);
  await lesson.save();
  return lesson;
};

export const updateLessonService = async (id, updateData) => {
  const lesson = await Lesson.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }
  return lesson;
};

export const deleteLessonService = async (id) => {
  const lesson = await Lesson.findByIdAndDelete(id);
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }
  return lesson;
};
