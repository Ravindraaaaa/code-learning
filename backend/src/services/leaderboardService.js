import CompetitionParticipation from '../models/CompetitionParticipation.js';

export const getGlobalLeaderboardService = async () => {
  const participations = await CompetitionParticipation.find().populate('student', 'name selectedLanguage');
  
  if (!participations || participations.length === 0) {
    return [];
  }

  const userStatsMap = new Map();

  for (const part of participations) {
    if (!part.student) continue;

    const studentId = part.student._id.toString();
    if (!userStatsMap.has(studentId)) {
      userStatsMap.set(studentId, {
        student: {
          id: studentId,
          name: part.student.name,
          language: part.student.selectedLanguage || 'N/A'
        },
        score: 0,
        solvedProblems: new Set()
      });
    }

    const stats = userStatsMap.get(studentId);
    
    // Sum totalScore across all joined competitions
    stats.score += part.totalScore || 0;

    // Tally uniquely solved problems across all submissions
    if (part.submissions && part.submissions.length > 0) {
      for (const sub of part.submissions) {
        if (sub.passed && sub.question) {
          stats.solvedProblems.add(sub.question.toString());
        }
      }
    }
  }

  const leaderboard = Array.from(userStatsMap.values()).map(stats => ({
    student: stats.student,
    score: stats.score,
    solvedProblems: stats.solvedProblems.size
  }));

  // Rank by score DESC, then by solvedProblems DESC
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.solvedProblems - a.solvedProblems;
  });

  // Assign ranks
  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return leaderboard;
};
