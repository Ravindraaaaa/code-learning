import { User } from '../models/index.js';
import { isDBConnected } from '../config/db.js';

/**
 * Retrieve real database-driven dashboard metrics for an authenticated student.
 * If fields have not been populated yet, returns 0s and empty arrays.
 * Strictly adheres to "Never create fake statistics".
 *
 * @param {string} userId - Authenticated user MongoDB ObjectId
 * @returns {Promise<Object>} Real dashboard metrics
 */
export const getStudentDashboardData = async (userId) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Student account not found');
    error.statusCode = 404;
    throw error;
  }

  // 1. Current Roadmap (null if not enrolled)
  const roadmap =
    user.roadmap && user.roadmap.enrolled
      ? {
          enrolled: true,
          title: user.roadmap.title || 'Untitled Track',
          trackId: user.roadmap.trackId || null,
          currentModule: user.roadmap.currentModule || 'Module 1: Orientation',
          completedModules: Number(user.roadmap.completedModules) || 0,
          totalModules: Number(user.roadmap.totalModules) || 0,
        }
      : null;

  // 2. Learning Progress (genuine counts, 0 if fresh)
  const learningProgress = {
    topicsCompleted: Number(user.learningProgress?.topicsCompleted) || 0,
    totalTopics: Number(user.learningProgress?.totalTopics) || 0,
    percentage: Number(user.learningProgress?.percentage) || 0,
    lastCompletedTopic: user.learningProgress?.lastCompletedTopic || null,
  };

  // 3. Streak Metrics (real consecutive days, 0 if none)
  const streak = {
    currentStreak: Number(user.streak?.currentStreak) || 0,
    longestStreak: Number(user.streak?.longestStreak) || 0,
    lastActiveDate: user.streak?.lastActiveDate || null,
    freezeDaysAvailable: Number(user.streak?.freezeDaysAvailable) || 0,
  };

  // 4. Skill Progress (empty array if no skills evaluated yet)
  const skills = Array.isArray(user.skills)
    ? user.skills.map((s) => ({
        name: s.name,
        level: s.level || 'Unrated',
        score: Number(s.score) || 0,
        problemsSolved: Number(s.problemsSolved) || 0,
      }))
    : [];

  // 5. Test Performance (0s if no tests taken yet)
  const testPerformance = {
    testsTaken: Number(user.testPerformance?.testsTaken) || 0,
    averageScore: Number(user.testPerformance?.averageScore) || 0,
    highestScore: Number(user.testPerformance?.highestScore) || 0,
    lastTestDate: user.testPerformance?.lastTestDate || null,
    recentTests: Array.isArray(user.testPerformance?.recentTests)
      ? user.testPerformance.recentTests.map((t) => ({
          testId: t.testId,
          title: t.title,
          score: Number(t.score) || 0,
          maxScore: Number(t.maxScore) || 0,
          date: t.date || new Date(),
        }))
      : [],
  };

  // 6. Recent Activity (empty array if no activities recorded yet)
  const recentActivity = Array.isArray(user.recentActivity)
    ? user.recentActivity.map((a) => ({
        activityType: a.activityType,
        title: a.title,
        detail: a.detail || '',
        timestamp: a.timestamp || new Date(),
      }))
    : [];

  // 7. Contextual Recommendations (derived from genuine student database state)
  const recommendations = [];

  if (!roadmap) {
    recommendations.push({
      id: 'rec-roadmap',
      title: 'Enroll in a Core Learning Track',
      description: 'Select your target language and track to establish a structured algorithmic foundation.',
      actionUrl: '/learn',
      actionLabel: 'Browse Tracks',
      tag: 'Curriculum',
      priority: 'high',
    });
  }

  if (skills.length === 0) {
    recommendations.push({
      id: 'rec-practice',
      title: 'Solve Initial Practice Problem',
      description: 'Tackle a foundation problem to calibrate your skill baseline across core data structures.',
      actionUrl: '/practice',
      actionLabel: 'Start Practice',
      tag: 'Skills',
      priority: 'high',
    });
  }

  if (testPerformance.testsTaken === 0) {
    recommendations.push({
      id: 'rec-diagnostic',
      title: 'Take Baseline Diagnostic Test',
      description: 'Complete a timed assessment to identify strengths and areas for targeted practice.',
      actionUrl: '/tests',
      actionLabel: 'Take Assessment',
      tag: 'Assessment',
      priority: 'medium',
    });
  }

  recommendations.push({
    id: 'rec-debug',
    title: 'Explore the Debug Arena',
    description: 'Practice spotting runtime bugs, logic flaws, and time complexity traps in broken algorithms.',
    actionUrl: '/debug-arena',
    actionLabel: 'Enter Arena',
    tag: 'Interactive',
    priority: 'low',
  });

  return {
    student: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      selectedLanguage: user.selectedLanguage || null,
      joinedAt: user.createdAt,
    },
    roadmap,
    learningProgress,
    streak,
    skills,
    testPerformance,
    recentActivity,
    recommendations,
  };
};
