import Competition from '../models/Competition.js';
import CompetitionQuestion from '../models/CompetitionQuestion.js';
import CompetitionParticipation from '../models/CompetitionParticipation.js';
import { codeExecutionService } from './codeExecutionService.js';
import { createNotification } from './notificationService.js';

export const getActiveCompetitionsService = async () => {
  return await Competition.find({ isActive: true }).sort('-startTime');
};

export const getCompetitionByIdService = async (id, userId = null) => {
  const comp = await Competition.findById(id);
  if (!comp) {
    const error = new Error('Competition not found');
    error.statusCode = 404;
    throw error;
  }

  const result = comp.toJSON();

  if (userId) {
    const participation = await CompetitionParticipation.findOne({ student: userId, competition: id });
    result.hasJoined = !!participation;
    if (participation) {
      result.totalScore = participation.totalScore;
    }
  }

  return result;
};

export const joinCompetitionService = async (userId, competitionId) => {
  const comp = await Competition.findById(competitionId);
  if (!comp || !comp.isActive) {
    const error = new Error('Competition is not available');
    error.statusCode = 404;
    throw error;
  }

  const existing = await CompetitionParticipation.findOne({ student: userId, competition: competitionId });
  if (existing) {
    const error = new Error('Already joined');
    error.statusCode = 400;
    throw error;
  }

  const participation = new CompetitionParticipation({
    student: userId,
    competition: competitionId
  });

  await participation.save();

  // Trigger Notification
  try {
    await createNotification({
      userId,
      type: 'competition',
      title: `Joined Competition: ${comp.title}`,
      message: `You have successfully joined ${comp.title}. Best of luck!`,
      data: { competitionId: comp._id, startTime: comp.startTime, endTime: comp.endTime }
    });
  } catch (err) {
    // Non-blocking notification logging
  }

  return participation;
};

export const getCompetitionQuestionsService = async (competitionId, userId) => {
  // Must be joined
  const participation = await CompetitionParticipation.findOne({ student: userId, competition: competitionId });
  if (!participation) {
    const error = new Error('You must join the competition first');
    error.statusCode = 403;
    throw error;
  }

  return await CompetitionQuestion.find({ competition: competitionId });
};

export const submitCompetitionQuestionService = async (userId, competitionId, questionId, language, code) => {
  const participation = await CompetitionParticipation.findOne({ student: userId, competition: competitionId });
  if (!participation) {
    const error = new Error('You must join the competition first');
    error.statusCode = 403;
    throw error;
  }

  const question = await CompetitionQuestion.findById(questionId);
  if (!question || question.competition.toString() !== competitionId) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }

  // Submit against hidden test cases using sandbox
  const executionResult = await codeExecutionService.submit(language, code, question.testCases);
  
  const passed = executionResult.passed;
  let scoreAwarded = 0;

  // Check if already successfully submitted this question to prevent double scoring
  const alreadyPassed = participation.submissions.some(s => s.question.toString() === questionId && s.passed);
  
  if (passed && !alreadyPassed) {
    scoreAwarded = question.points;
    participation.totalScore += scoreAwarded;
  }

  participation.submissions.push({
    question: questionId,
    submittedCode: code,
    language,
    passed,
    score: passed ? question.points : 0
  });

  await participation.save();

  return {
    passed,
    executionResult,
    scoreAwarded,
    totalScore: participation.totalScore
  };
};

export const createCompetitionService = async (data) => {
  const comp = new Competition({
    title: data.title,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime
  });
  await comp.save();

  if (data.questions && data.questions.length > 0) {
    for (const q of data.questions) {
      await CompetitionQuestion.create({
        competition: comp._id,
        title: q.title,
        description: q.description,
        points: q.points,
        testCases: q.testCases
      });
    }
  }

  return comp;
};
