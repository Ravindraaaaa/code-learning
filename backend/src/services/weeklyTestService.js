import WeeklyTest from '../models/WeeklyTest.js';
import WeeklyTestQuestion from '../models/WeeklyTestQuestion.js';
import WeeklyTestResult from '../models/WeeklyTestResult.js';

export const getActiveTestsService = async () => {
  return await WeeklyTest.find({ isActive: true })
    .populate('questions', '-correctOptionIndex')
    .sort('-createdAt');
};

export const getTestByIdService = async (id) => {
  const test = await WeeklyTest.findById(id).populate('questions', '-correctOptionIndex');
  if (!test || !test.isActive) {
    const error = new Error('Test not found');
    error.statusCode = 404;
    throw error;
  }
  return test;
};

export const submitTestService = async (userId, testId, answersData, startedAt) => {
  const test = await WeeklyTest.findById(testId).populate('questions');
  if (!test || !test.isActive) {
    const error = new Error('Test not found');
    error.statusCode = 404;
    throw error;
  }

  let totalPoints = 0;
  let score = 0;
  const processedAnswers = [];

  for (const question of test.questions) {
    totalPoints += question.points;
    const studentAnswer = answersData.find(a => a.questionId === question._id.toString());
    
    let selectedOptionIndex = -1;
    let isCorrect = false;

    if (studentAnswer && studentAnswer.selectedOptionIndex !== undefined && studentAnswer.selectedOptionIndex !== null) {
      selectedOptionIndex = studentAnswer.selectedOptionIndex;
      if (selectedOptionIndex === question.correctOptionIndex) {
        isCorrect = true;
        score += question.points;
      }
    }

    processedAnswers.push({
      question: question._id,
      selectedOptionIndex,
      isCorrect
    });
  }

  const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0;

  const result = new WeeklyTestResult({
    student: userId,
    test: testId,
    answers: processedAnswers,
    score,
    totalPoints,
    percentage,
    startedAt: new Date(startedAt || Date.now() - test.durationMinutes * 60000)
  });

  await result.save();
  return result;
};

// Admin Service
export const createTestService = async (testData) => {
  const { title, description, durationMinutes, questions } = testData;
  const test = new WeeklyTest({ title, description, durationMinutes });
  
  const createdQuestions = [];
  for (const q of questions) {
    const newQuestion = new WeeklyTestQuestion({
      test: test._id,
      questionText: q.questionText,
      options: q.options,
      correctOptionIndex: q.correctOptionIndex,
      points: q.points || 1
    });
    await newQuestion.save();
    createdQuestions.push(newQuestion._id);
  }

  test.questions = createdQuestions;
  await test.save();
  return test;
};
