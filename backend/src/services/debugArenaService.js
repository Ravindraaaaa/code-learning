import mongoose from 'mongoose';
import DebugChallenge from '../models/DebugChallenge.js';
import DebugAttempt from '../models/DebugAttempt.js';
import { User } from '../models/index.js';
import { codeExecutionService } from './codeExecutionService.js';

export const getChallengesService = async (language, difficulty, userId = null) => {
  const filter = { isActive: true };
  if (language && language !== 'All') filter.language = language.toLowerCase();
  if (difficulty && difficulty !== 'All') filter.difficulty = difficulty;

  const challenges = await DebugChallenge.find(filter).sort('-createdAt');
  const cleanChallenges = challenges.map(c => (typeof c.toJSON === 'function' ? c.toJSON() : c));

  if (userId) {
    try {
      const passedAttempts = await DebugAttempt.find({ student: userId, status: 'Passed' });
      const solvedIds = new Set(passedAttempts.map(a => String(a.challenge?._id || a.challenge)));
      return cleanChallenges.map(c => ({
        ...c,
        isSolved: solvedIds.has(String(c._id))
      }));
    } catch {
      return cleanChallenges;
    }
  }

  return cleanChallenges;
};

export const getChallengeByIdService = async (id, userId = null) => {
  const challenge = await DebugChallenge.findById(id);
  if (!challenge || !challenge.isActive) {
    const err = new Error('Challenge not found');
    err.statusCode = 404;
    throw err;
  }
  const clean = typeof challenge.toJSON === 'function' ? challenge.toJSON() : challenge;
  if (userId) {
    try {
      const passed = await DebugAttempt.findOne({ student: userId, challenge: id, status: 'Passed' });
      clean.isSolved = Boolean(passed);
    } catch {
      clean.isSolved = false;
    }
  }
  return clean;
};

export const getChallengeAttemptsService = async (userId, challengeId) => {
  const filter = { student: userId };
  if (challengeId) filter.challenge = challengeId;
  const attempts = await DebugAttempt.find(filter).sort({ createdAt: -1 }).limit(20);
  return attempts;
};

export const submitDebugAttemptService = async (userId, challengeId, submittedCode, hintsUsed = 0) => {
  const challenge = await DebugChallenge.findById(challengeId);
  if (!challenge || !challenge.isActive) {
    const err = new Error('Challenge not found');
    err.statusCode = 404;
    throw err;
  }

  const startTime = Date.now();
  // Submit via sandbox engine evaluating against all test cases
  const executionResult = await codeExecutionService.submit(challenge.language, submittedCode, challenge.testCases);
  const executionTimeMs = Date.now() - startTime;

  let overallStatus = 'Failed';
  if (executionResult.status === 'success' || executionResult.passed) {
    overallStatus = 'Passed';
  } else if (executionResult.details && executionResult.details.some(d => d.status === 'compile_error')) {
    overallStatus = 'Compile Error';
  } else if (executionResult.details && executionResult.details.some(d => d.status === 'runtime_error')) {
    overallStatus = 'Runtime Error';
  } else if (executionResult.details && executionResult.details.some(d => d.status === 'timeout')) {
    overallStatus = 'Timeout';
  }

  const testCaseResults = executionResult.details ? executionResult.details.map((tc, index) => {
    const orig = challenge.testCases[index] || {};
    return {
      testCaseId: orig._id || new mongoose.Types.ObjectId(),
      name: `Test Case #${index + 1}`,
      input: orig.input || tc.input || '',
      expectedOutput: orig.expectedOutput || tc.expected || '',
      actualOutput: tc.actual || '',
      passed: tc.passed || tc.status === 'completed',
      status: tc.status,
      runtimeMs: tc.runtimeMs,
      error: tc.error || null
    };
  }) : [];

  const passedCount = testCaseResults.filter(tc => tc.passed).length;
  const totalCount = challenge.testCases.length;
  const baseScore = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
  const safeHintsUsed = Math.max(0, Math.min(Number(hintsUsed) || 0, 3));
  // 5% penalty per revealed hint (max 15% for all 3 hints)
  const hintPenalty = safeHintsUsed * 5;
  const finalScore = Math.max(0, baseScore - hintPenalty);

  const attemptData = {
    student: userId,
    challenge: challengeId,
    submittedCode,
    status: overallStatus,
    score: finalScore,
    hintsUsed: safeHintsUsed,
    hintPenalty,
    executionTimeMs,
    feedback: overallStatus === 'Passed'
      ? (safeHintsUsed > 0
          ? `Great job! All ${totalCount} test cases passed. Bug resolved (${safeHintsUsed} hint${safeHintsUsed > 1 ? 's' : ''} used, -${hintPenalty}% penalty).`
          : `Great job! All ${totalCount} test cases passed with zero hints used (100% full score)!`)
      : `Passed ${passedCount} of ${totalCount} test cases (${overallStatus}). Check the breakdown below to see what failed.`,
    testCaseResults
  };

  const attempt = await DebugAttempt.create(attemptData);

  // If passed, record genuine activity for student
  if (overallStatus === 'Passed') {
    try {
      const user = await User.findById(userId);
      if (user) {
        if (!user.recentActivity) user.recentActivity = [];
        const alreadyRecorded = user.recentActivity.some(
          a => a.type === 'debug_challenge_solved' && String(a.challengeId) === String(challengeId)
        );
        if (!alreadyRecorded) {
          user.recentActivity.unshift({
            type: 'debug_challenge_solved',
            title: `Fixed Bug: ${challenge.title}`,
            challengeId: challengeId,
            timestamp: new Date()
          });
          if (user.recentActivity.length > 20) {
            user.recentActivity = user.recentActivity.slice(0, 20);
          }
          await user.save();
        }
      }
    } catch {}
  }

  return attempt;
};

export const createChallengeService = async (data) => {
  const challenge = new DebugChallenge(data);
  await challenge.save();
  return challenge;
};
