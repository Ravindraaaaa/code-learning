import AssessmentQuestion from '../models/AssessmentQuestion.js';
import AssessmentSubmission from '../models/AssessmentSubmission.js';
import { createNotification } from './notificationService.js';

export const getQuestionsForAssessment = async (filter) => {
  // Returns questions without correctOptionIndex because of the toJSON override in schema
  const questions = await AssessmentQuestion.find(filter).sort({ createdAt: 1 }).limit(20);
  return questions.map(q => q.toJSON());
};

export const submitAssessment = async (userId, data) => {
  const { track, language, answers, startedAt } = data;
  
  let score = 0;
  const processedAnswers = [];

  for (const answer of answers) {
    const question = await AssessmentQuestion.findById(answer.questionId);
    if (!question) continue;

    const isCorrect = question.correctOptionIndex === answer.selectedOptionIndex;
    if (isCorrect) score += 1;

    processedAnswers.push({
      question: question._id,
      selectedOptionIndex: answer.selectedOptionIndex,
      isCorrect
    });
  }

  const totalQuestions = processedAnswers.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  let level = 'Beginner';
  if (percentage >= 80) level = 'Advanced';
  else if (percentage >= 50) level = 'Intermediate';

  const submission = new AssessmentSubmission({
    student: userId,
    track: track || null,
    language: language || null,
    answers: processedAnswers,
    score,
    totalQuestions,
    percentage,
    level,
    startedAt: startedAt || Date.now(),
    completedAt: Date.now()
  });

  await submission.save();

  // Trigger Notification
  try {
    await createNotification({
      userId,
      type: 'assessment_result',
      title: 'Assessment Result Available',
      message: `You scored ${percentage}% (${score}/${totalQuestions}) on your assessment. Assigned Level: ${level}.`,
      data: { submissionId: submission._id, score, totalQuestions, percentage, level }
    });
  } catch (err) {
    // Non-blocking notification error logging
  }

  return submission;
};

// Admin CRUD functions
export const createQuestionService = async (data) => {
  const question = new AssessmentQuestion(data);
  await question.save();
  return question;
};

export const updateQuestionService = async (id, data) => {
  const question = await AssessmentQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!question) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }
  return question;
};

export const deleteQuestionService = async (id) => {
  const question = await AssessmentQuestion.findByIdAndDelete(id);
  if (!question) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }
  return question;
};
