import {
  User,
  LessonProgress,
  DebugAttempt,
  WeeklyTestResult,
  CompetitionParticipation,
  Roadmap
} from '../models/index.js';

export const getStudentProgressService = async (studentId) => {
  const user = await User.findById(studentId);
  if (!user) {
    throw new Error('User not found');
  }

  // 1. Lessons completed
  const lessonsCompletedCount = await LessonProgress.countDocuments({
    student: studentId,
    status: 'completed',
  });

  // 2. Debug challenges passed
  const debugPassedCount = await DebugAttempt.countDocuments({
    student: studentId,
    passed: true,
  });

  // 3. Test scores
  const testResults = await WeeklyTestResult.find({ student: studentId });
  const testsTaken = testResults.length;
  const averageTestScore = testsTaken > 0
    ? testResults.reduce((acc, curr) => acc + curr.percentage, 0) / testsTaken
    : 0;

  // 4. Competition results & Questions solved
  const participations = await CompetitionParticipation.find({ student: studentId });
  let competitionsJoined = participations.length;
  let totalCompetitionScore = 0;
  let competitionQuestionsSolved = 0;

  for (const p of participations) {
    totalCompetitionScore += p.totalScore || 0;
    if (p.submissions && p.submissions.length > 0) {
      const passedSubs = p.submissions.filter(sub => sub.passed);
      // count unique questions solved
      const uniqueQ = new Set(passedSubs.map(s => s.question.toString()));
      competitionQuestionsSolved += uniqueQ.size;
    }
  }

  // 5. Total Questions Solved (Competitions + Debug)
  const totalQuestionsSolved = competitionQuestionsSolved + debugPassedCount;

  // 6. Topic Progress (from Roadmap)
  // Check if they have an active roadmap
  const roadmap = await Roadmap.findOne({ student: studentId });
  let topicsCompleted = 0;
  let totalTopics = 0;
  let roadmapProgress = 0;

  if (roadmap && roadmap.topics) {
    totalTopics = roadmap.topics.length;
    topicsCompleted = roadmap.topics.filter(t => t.status === 'completed').length;
    roadmapProgress = totalTopics > 0 ? Math.round((topicsCompleted / totalTopics) * 100) : 0;
  }

  // 7. Streaks
  const streak = user.streak || { currentStreak: 0, longestStreak: 0 };

  return {
    lessonsCompleted: lessonsCompletedCount,
    questionsSolved: totalQuestionsSolved,
    debugChallengesPassed: debugPassedCount,
    testsTaken,
    averageTestScore: Math.round(averageTestScore),
    competitionsJoined,
    totalCompetitionScore,
    roadmap: {
      hasRoadmap: !!roadmap,
      topicsCompleted,
      totalTopics,
      progressPercentage: roadmapProgress
    },
    streak: streak.currentStreak,
    longestStreak: streak.longestStreak
  };
};

export const getStudentHeatmapService = async (studentId) => {
  const user = await User.findById(studentId);
  if (!user) {
    throw new Error('User not found');
  }

  // Generate Daily Activity map from MongoDB records
  const dailyMap = {};

  const incDate = (date) => {
    if (!date) return;
    const d = new Date(date).toISOString().split('T')[0];
    dailyMap[d] = (dailyMap[d] || 0) + 1;
  };

  // Add lesson progress to daily map
  const lessons = await LessonProgress.find({ student: studentId });
  lessons.forEach(l => incDate(l.updatedAt));

  // Add debug attempts to daily map
  const debugs = await DebugAttempt.find({ student: studentId });
  debugs.forEach(d => incDate(d.createdAt));

  // Add test results
  const tests = await WeeklyTestResult.find({ student: studentId });
  tests.forEach(t => incDate(t.submittedAt));

  // Add competition participations
  const comps = await CompetitionParticipation.find({ student: studentId });
  comps.forEach(c => incDate(c.updatedAt));

  // Also include user.recentActivity if present
  if (user.recentActivity && Array.isArray(user.recentActivity)) {
    user.recentActivity.forEach(a => incDate(a.timestamp));
  }

  const dailyActivity = Object.keys(dailyMap).map(date => ({
    date,
    count: dailyMap[date]
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate Coding Activity Breakdown
  const codingActivity = {
    lessons: lessons.length,
    debugChallenges: debugs.length,
    tests: tests.length,
    competitions: comps.length
  };

  // Topic Strength (from user skills)
  const topicStrength = user.skills || [];

  return {
    dailyActivity,
    codingActivity,
    topicStrength
  };
};
