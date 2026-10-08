import DebugChallenge from '../models/DebugChallenge.js';
import DebugAttempt from '../models/DebugAttempt.js';
import { codeExecutionService } from './codeExecutionService.js';

export const getChallengesService = async (language, difficulty) => {
  const filter = { isActive: true };
  if (language) filter.language = language;
  if (difficulty) filter.difficulty = difficulty;

  // The schema's toJSON method handles stripping the solutionCode automatically
  return await DebugChallenge.find(filter).sort('-createdAt');
};

export const getChallengeByIdService = async (id) => {
  const challenge = await DebugChallenge.findById(id);
  if (!challenge || !challenge.isActive) {
    const err = new Error('Challenge not found');
    err.statusCode = 404;
    throw err;
  }
  return challenge;
};

export const submitDebugAttemptService = async (userId, challengeId, submittedCode) => {
  const challenge = await DebugChallenge.findById(challengeId);
  if (!challenge || !challenge.isActive) {
    const err = new Error('Challenge not found');
    err.statusCode = 404;
    throw err;
  }

  const startTime = Date.now();
  // Submit via sandbox using all test cases
  const executionResult = await codeExecutionService.submit(challenge.language, submittedCode, challenge.testCases);
  const executionTimeMs = Date.now() - startTime;

  let overallStatus = 'Failed';
  if (executionResult.status === 'success') {
    overallStatus = 'Passed';
  } else if (executionResult.details && executionResult.details.some(d => d.status === 'compile_error')) {
    overallStatus = 'Compile Error';
  } else if (executionResult.details && executionResult.details.some(d => d.status === 'runtime_error')) {
    overallStatus = 'Runtime Error';
  } else if (executionResult.details && executionResult.details.some(d => d.status === 'timeout')) {
    overallStatus = 'Timeout';
  }

  const testCaseResults = executionResult.details ? executionResult.details.map((tc, index) => ({
    testCaseId: challenge.testCases[index]._id,
    passed: tc.status === 'completed' || tc.status === 'passed',
    actualOutput: tc.actual,
    error: tc.error
  })) : [];

  // Create attempt
  const attempt = new DebugAttempt({
    student: userId,
    challenge: challengeId,
    submittedCode,
    status: overallStatus,
    score: executionResult.score,
    executionTimeMs,
    feedback: overallStatus === 'Passed' 
      ? 'Excellent! You completely fixed the bug and passed all test cases.' 
      : 'Keep trying! Check the failed test cases to understand what went wrong.',
    testCaseResults
  });

  await attempt.save();
  return attempt;
};

export const createChallengeService = async (data) => {
  const challenge = new DebugChallenge(data);
  await challenge.save();
  return challenge;
};
