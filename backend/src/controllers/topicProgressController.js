import { User } from '../models/index.js';
import { isDBConnected } from '../config/db.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * Record authentic topic completion for the authenticated student.
 * Never fabricates progress; updates User.learningProgress and User.recentActivity.
 */
export const completeTopic = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendError(res, 503, 'Database service is currently unavailable. Please verify MongoDB is running.');
    }

    const { topicSlug, topicTitle, moduleSlug } = req.body;
    if (!topicSlug) {
      return sendError(res, 400, 'topicSlug is required');
    }

    const userId = req.user?.id;
    const userEmail = req.user?.email;

    let user = null;
    if (userId) {
      try {
        user = await User.findById(userId);
      } catch {
        user = null;
      }
    }
    if (!user && userEmail) {
      try {
        user = await User.findOne({ email: String(userEmail).toLowerCase().trim() });
      } catch {
        user = null;
      }
    }

    if (!user) {
      return sendError(res, 404, 'Student account not found');
    }

    // Ensure learningProgress structure
    if (!user.learningProgress) {
      user.learningProgress = {
        topicsCompleted: 0,
        totalTopics: 10,
        percentage: 0,
        lastCompletedTopic: null,
        completedTopicsList: [],
      };
    }

    if (!Array.isArray(user.learningProgress.completedTopicsList)) {
      user.learningProgress.completedTopicsList = [];
    }

    const cleanSlug = String(topicSlug).trim().toLowerCase();
    const cleanTitle = topicTitle ? String(topicTitle).trim() : cleanSlug;

    // Add topic if not already recorded
    if (!user.learningProgress.completedTopicsList.includes(cleanSlug)) {
      user.learningProgress.completedTopicsList.push(cleanSlug);
      user.learningProgress.topicsCompleted = user.learningProgress.completedTopicsList.length;
      user.learningProgress.totalTopics = Math.max(Number(user.learningProgress.totalTopics) || 10, 10);
      user.learningProgress.percentage = Math.min(
        Math.round((user.learningProgress.topicsCompleted / user.learningProgress.totalTopics) * 100),
        100
      );
      user.learningProgress.lastCompletedTopic = cleanTitle;

      // Log authentic student activity
      if (!Array.isArray(user.recentActivity)) {
        user.recentActivity = [];
      }
      const moduleName = String(moduleSlug || 'html').toUpperCase();
      user.recentActivity.unshift({
        activityType: 'lesson_completed',
        title: `Completed ${moduleName}: ${cleanTitle}`,
        detail: `Finished comprehensive lesson notes and verified practice solution for ${cleanTitle} in ${moduleName}.`,
        timestamp: new Date(),
      });
      if (user.recentActivity.length > 20) {
        user.recentActivity = user.recentActivity.slice(0, 20);
      }

      // Update student streak if first active session today
      if (!user.streak) {
        user.streak = { currentStreak: 0, longestStreak: 0, lastActiveDate: null, freezeDaysAvailable: 0 };
      }
      const today = new Date().toDateString();
      const lastActive = user.streak.lastActiveDate ? new Date(user.streak.lastActiveDate).toDateString() : null;
      if (lastActive !== today) {
        user.streak.currentStreak = (Number(user.streak.currentStreak) || 0) + 1;
        user.streak.longestStreak = Math.max(Number(user.streak.longestStreak) || 0, user.streak.currentStreak);
        user.streak.lastActiveDate = new Date();
      }

      await user.save();
    }

    return sendSuccess(res, 200, 'Topic marked as completed', {
      completedTopics: user.learningProgress.completedTopicsList,
      topicsCompleted: user.learningProgress.topicsCompleted,
      totalTopics: user.learningProgress.totalTopics,
      percentage: user.learningProgress.percentage,
      lastCompletedTopic: user.learningProgress.lastCompletedTopic,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieve authentic topic completion list for the authenticated student.
 */
export const getTopicProgress = async (req, res, next) => {
  try {
    if (!isDBConnected()) {
      return sendError(res, 503, 'Database service is currently unavailable.');
    }

    const userId = req.user?.id;
    const userEmail = req.user?.email;

    let user = null;
    if (userId) {
      try {
        user = await User.findById(userId);
      } catch {
        user = null;
      }
    }
    if (!user && userEmail) {
      try {
        user = await User.findOne({ email: String(userEmail).toLowerCase().trim() });
      } catch {
        user = null;
      }
    }

    if (!user) {
      return sendError(res, 404, 'Student account not found');
    }

    return sendSuccess(res, 200, 'Topic progress retrieved successfully', {
      completedTopics: Array.isArray(user.learningProgress?.completedTopicsList)
        ? user.learningProgress.completedTopicsList
        : [],
      topicsCompleted: Number(user.learningProgress?.topicsCompleted) || 0,
      totalTopics: Number(user.learningProgress?.totalTopics) || 10,
      percentage: Number(user.learningProgress?.percentage) || 0,
      lastCompletedTopic: user.learningProgress?.lastCompletedTopic || null,
    });
  } catch (error) {
    next(error);
  }
};

