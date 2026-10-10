import bcrypt from 'bcryptjs';
import {
  User,
  Language,
  Track,
  Topic,
  Lesson,
  AssessmentQuestion,
  DebugChallenge,
  WeeklyTest,
  Competition,
  Batch,
  Purchase,
} from '../models/index.js';
import { logger } from '../utils/logger.js';

// Helper for pagination metadata
const buildPagination = (total, page, limit) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const totalPages = Math.ceil(total / limitNum) || 1;
  return {
    total,
    page: pageNum,
    limit: limitNum,
    totalPages,
  };
};

/* ==========================================================================
   1. STUDENTS ADMIN SERVICE
   ========================================================================== */

export const getStudentsAdminService = async ({ page = 1, limit = 10, search = '', role = '' }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (role) {
    query.role = role;
  }
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  const [students, total] = await Promise.all([
    User.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    User.countDocuments(query),
  ]);

  return {
    students,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getStudentByIdAdminService = async (studentId) => {
  const student = await User.findById(studentId).select('-passwordHash');
  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }
  return student;
};

export const createStudentAdminService = async (data) => {
  const normalizedEmail = data.email.toLowerCase().trim();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    const error = new Error('An account with this email address already exists.');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const newUser = await User.create({
    name: data.name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: data.role || 'student',
    selectedLanguage: data.selectedLanguage || null,
  });

  return newUser.toJSON();
};

export const updateStudentAdminService = async (studentId, data) => {
  const student = await User.findById(studentId);
  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.email) {
    const normalizedEmail = data.email.toLowerCase().trim();
    if (normalizedEmail !== student.email) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        const error = new Error('An account with this email address already exists.');
        error.statusCode = 409;
        throw error;
      }
      student.email = normalizedEmail;
    }
  }

  if (data.name) student.name = data.name.trim();
  if (data.role) student.role = data.role;
  if (data.selectedLanguage !== undefined) student.selectedLanguage = data.selectedLanguage;

  if (data.password) {
    student.passwordHash = await bcrypt.hash(data.password, 10);
  }

  await student.save();
  return student.toJSON();
};

export const deleteStudentAdminService = async (studentId, requestingAdminId) => {
  if (String(studentId) === String(requestingAdminId)) {
    const error = new Error('Administrators cannot delete their own active account.');
    error.statusCode = 400;
    throw error;
  }

  const student = await User.findById(studentId);
  if (!student) {
    const error = new Error('Student not found');
    error.statusCode = 404;
    throw error;
  }

  await User.findByIdAndDelete(studentId);
  return { id: studentId, message: 'Student account deleted successfully' };
};

/* ==========================================================================
   2. LANGUAGES ADMIN SERVICE
   ========================================================================== */

export const getLanguagesAdminService = async ({ page = 1, limit = 10, search = '', isActive }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (isActive !== undefined && isActive !== '') {
    query.isActive = isActive === 'true' || isActive === true;
  }
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { slug: searchRegex }];
  }

  const [languages, total] = await Promise.all([
    Language.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Language.countDocuments(query),
  ]);

  return {
    languages,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getLanguageByIdAdminService = async (languageId) => {
  const language = await Language.findById(languageId);
  if (!language) {
    const error = new Error('Language not found');
    error.statusCode = 404;
    throw error;
  }
  return language;
};

export const createLanguageAdminService = async (data) => {
  const slug = data.slug.toLowerCase().trim();
  const existing = await Language.findOne({ slug });
  if (existing) {
    const error = new Error(`Language with slug '${slug}' already exists.`);
    error.statusCode = 409;
    throw error;
  }

  const language = await Language.create({
    name: data.name.trim(),
    slug,
    version: data.version.trim(),
    fileExtension: data.fileExtension.trim(),
    monacoMode: data.monacoMode.trim(),
    defaultTemplate: data.defaultTemplate || '',
    description: data.description || '',
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : 0,
  });

  return language;
};

export const updateLanguageAdminService = async (languageId, data) => {
  const language = await Language.findById(languageId);
  if (!language) {
    const error = new Error('Language not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.slug && data.slug.toLowerCase().trim() !== language.slug) {
    const slug = data.slug.toLowerCase().trim();
    const existing = await Language.findOne({ slug });
    if (existing) {
      const error = new Error(`Language with slug '${slug}' already exists.`);
      error.statusCode = 409;
      throw error;
    }
    language.slug = slug;
  }

  if (data.name) language.name = data.name.trim();
  if (data.version) language.version = data.version.trim();
  if (data.fileExtension) language.fileExtension = data.fileExtension.trim();
  if (data.monacoMode) language.monacoMode = data.monacoMode.trim();
  if (data.defaultTemplate !== undefined) language.defaultTemplate = data.defaultTemplate;
  if (data.description !== undefined) language.description = data.description.trim();
  if (data.isActive !== undefined) language.isActive = Boolean(data.isActive);
  if (data.displayOrder !== undefined) language.displayOrder = Number(data.displayOrder);

  await language.save();
  return language;
};

export const deleteLanguageAdminService = async (languageId) => {
  const language = await Language.findById(languageId);
  if (!language) {
    const error = new Error('Language not found');
    error.statusCode = 404;
    throw error;
  }

  await Language.findByIdAndDelete(languageId);
  return { id: languageId, message: 'Language runtime deleted successfully' };
};

/* ==========================================================================
   3. TRACKS ADMIN SERVICE
   ========================================================================== */

export const getTracksAdminService = async ({ page = 1, limit = 10, search = '', isActive }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (isActive !== undefined && isActive !== '') {
    query.isActive = isActive === 'true' || isActive === true;
  }
  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { slug: searchRegex }, { category: searchRegex }];
  }

  const [tracks, total] = await Promise.all([
    Track.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Track.countDocuments(query),
  ]);

  return {
    tracks,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getTrackByIdAdminService = async (trackId) => {
  const track = await Track.findById(trackId);
  if (!track) {
    const error = new Error('Track not found');
    error.statusCode = 404;
    throw error;
  }
  return track;
};

export const createTrackAdminService = async (data) => {
  const slug = data.slug.toLowerCase().trim();
  const existing = await Track.findOne({ slug });
  if (existing) {
    const error = new Error(`Learning track with slug '${slug}' already exists.`);
    error.statusCode = 409;
    throw error;
  }

  const defaultModules = [
    { name: 'Introduction Module', slug: 'intro-module', order: 1, description: 'Core principles and foundations.' }
  ];

  const track = await Track.create({
    name: data.name.trim(),
    slug,
    description: data.description.trim(),
    category: data.category || 'Full-Stack Development',
    modules: data.modules && data.modules.length > 0 ? data.modules : defaultModules,
    level: data.level || 'Beginner to Advanced',
    estimatedHours: data.estimatedHours ? Number(data.estimatedHours) : 120,
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : 1,
  });

  return track;
};

export const updateTrackAdminService = async (trackId, data) => {
  const track = await Track.findById(trackId);
  if (!track) {
    const error = new Error('Track not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.slug && data.slug.toLowerCase().trim() !== track.slug) {
    const slug = data.slug.toLowerCase().trim();
    const existing = await Track.findOne({ slug });
    if (existing) {
      const error = new Error(`Learning track with slug '${slug}' already exists.`);
      error.statusCode = 409;
      throw error;
    }
    track.slug = slug;
  }

  if (data.name) track.name = data.name.trim();
  if (data.description) track.description = data.description.trim();
  if (data.category) track.category = data.category.trim();
  if (data.modules) track.modules = data.modules;
  if (data.level) track.level = data.level;
  if (data.estimatedHours !== undefined) track.estimatedHours = Number(data.estimatedHours);
  if (data.isActive !== undefined) track.isActive = Boolean(data.isActive);
  if (data.displayOrder !== undefined) track.displayOrder = Number(data.displayOrder);

  await track.save();
  return track;
};

export const deleteTrackAdminService = async (trackId) => {
  const track = await Track.findById(trackId);
  if (!track) {
    const error = new Error('Track not found');
    error.statusCode = 404;
    throw error;
  }

  await Track.findByIdAndDelete(trackId);
  return { id: trackId, message: 'Learning track deleted successfully' };
};

/* ==========================================================================
   4. TOPICS ADMIN SERVICE
   ========================================================================== */

export const getTopicsAdminService = async ({
  page = 1,
  limit = 10,
  search = '',
  language,
  track,
  difficulty,
  status,
}) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (language) query.language = language;
  if (track) query.track = track;
  if (difficulty) query.difficulty = difficulty;
  if (status) query.status = status;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  const [topics, total] = await Promise.all([
    Topic.find(query)
      .populate('language', 'name slug')
      .populate('track', 'name slug')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Topic.countDocuments(query),
  ]);

  return {
    topics,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getTopicByIdAdminService = async (topicId) => {
  const topic = await Topic.findById(topicId)
    .populate('language', 'name slug')
    .populate('track', 'name slug');
  if (!topic) {
    const error = new Error('Topic not found');
    error.statusCode = 404;
    throw error;
  }
  return topic;
};

export const createTopicAdminService = async (data) => {
  const topic = await Topic.create({
    title: data.title.trim(),
    description: data.description.trim(),
    track: data.track || null,
    language: data.language || null,
    difficulty: data.difficulty || 'Beginner',
    order: Number(data.order),
    status: data.status || 'published',
  });

  return topic.populate(['language', 'track']);
};

export const updateTopicAdminService = async (topicId, data) => {
  const topic = await Topic.findById(topicId);
  if (!topic) {
    const error = new Error('Topic not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.title) topic.title = data.title.trim();
  if (data.description) topic.description = data.description.trim();
  if (data.track !== undefined) topic.track = data.track || null;
  if (data.language !== undefined) topic.language = data.language || null;
  if (data.difficulty) topic.difficulty = data.difficulty;
  if (data.order !== undefined) topic.order = Number(data.order);
  if (data.status) topic.status = data.status;

  await topic.save();
  return topic.populate(['language', 'track']);
};

export const deleteTopicAdminService = async (topicId) => {
  const topic = await Topic.findById(topicId);
  if (!topic) {
    const error = new Error('Topic not found');
    error.statusCode = 404;
    throw error;
  }

  await Topic.findByIdAndDelete(topicId);
  return { id: topicId, message: 'Topic deleted successfully' };
};

/* ==========================================================================
   5. LESSONS ADMIN SERVICE
   ========================================================================== */

export const getLessonsAdminService = async ({ page = 1, limit = 10, search = '', status, topic, difficulty }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (status) query.status = status;
  if (topic) query.topic = topic;
  if (difficulty) query.difficulty = difficulty;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { content: searchRegex }];
  }

  const [lessons, total] = await Promise.all([
    Lesson.find(query)
      .populate('topic', 'title difficulty')
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Lesson.countDocuments(query),
  ]);

  return {
    lessons,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getLessonByIdAdminService = async (lessonId) => {
  const lesson = await Lesson.findById(lessonId).populate('topic', 'title difficulty');
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }
  return lesson;
};

export const createLessonAdminService = async (data) => {
  const lesson = await Lesson.create({
    title: data.title.trim(),
    content: data.content.trim(),
    topic: data.topic,
    difficulty: data.difficulty || 'Beginner',
    estimatedTime: data.estimatedTime ? Number(data.estimatedTime) : 10,
    order: Number(data.order),
    status: data.status || 'published',
  });

  return lesson.populate('topic', 'title difficulty');
};

export const updateLessonAdminService = async (lessonId, data) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.title) lesson.title = data.title.trim();
  if (data.content) lesson.content = data.content.trim();
  if (data.topic) lesson.topic = data.topic;
  if (data.difficulty) lesson.difficulty = data.difficulty;
  if (data.estimatedTime !== undefined) lesson.estimatedTime = Number(data.estimatedTime);
  if (data.order !== undefined) lesson.order = Number(data.order);
  if (data.status) lesson.status = data.status;

  await lesson.save();
  return lesson.populate('topic', 'title difficulty');
};

export const deleteLessonAdminService = async (lessonId) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }

  await Lesson.findByIdAndDelete(lessonId);
  return { id: lessonId, message: 'Lesson deleted successfully' };
};

export const setLessonPublishStatusAdminService = async (lessonId, isPublished) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    const error = new Error('Lesson not found');
    error.statusCode = 404;
    throw error;
  }

  lesson.status = isPublished ? 'published' : 'draft';
  await lesson.save();
  return lesson;
};

/* ==========================================================================
   6. QUESTIONS (ASSESSMENT QUESTIONS) ADMIN SERVICE
   ========================================================================== */

export const getQuestionsAdminService = async ({ page = 1, limit = 10, search = '', status, track, language, difficulty }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (status) query.status = status;
  if (track) query.track = track;
  if (language) query.language = language;
  if (difficulty) query.difficulty = difficulty;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.questionText = searchRegex;
  }

  const [questions, total] = await Promise.all([
    AssessmentQuestion.find(query)
      .populate('track', 'name slug')
      .populate('language', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    AssessmentQuestion.countDocuments(query),
  ]);

  return {
    questions,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getQuestionByIdAdminService = async (questionId) => {
  const question = await AssessmentQuestion.findById(questionId)
    .populate('track', 'name slug')
    .populate('language', 'name slug');
  if (!question) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }
  return question;
};

export const createQuestionAdminService = async (data) => {
  const question = await AssessmentQuestion.create({
    questionText: data.questionText.trim(),
    options: data.options,
    correctOptionIndex: Number(data.correctOptionIndex),
    difficulty: data.difficulty || 'Beginner',
    track: data.track || null,
    language: data.language || null,
    status: data.status || 'published',
  });

  return question;
};

export const updateQuestionAdminService = async (questionId, data) => {
  const question = await AssessmentQuestion.findById(questionId);
  if (!question) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.questionText) question.questionText = data.questionText.trim();
  if (data.options) question.options = data.options;
  if (data.correctOptionIndex !== undefined) question.correctOptionIndex = Number(data.correctOptionIndex);
  if (data.difficulty) question.difficulty = data.difficulty;
  if (data.track !== undefined) question.track = data.track || null;
  if (data.language !== undefined) question.language = data.language || null;
  if (data.status) question.status = data.status;

  await question.save();
  return question;
};

export const deleteQuestionAdminService = async (questionId) => {
  const question = await AssessmentQuestion.findById(questionId);
  if (!question) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }

  await AssessmentQuestion.findByIdAndDelete(questionId);
  return { id: questionId, message: 'Assessment question deleted successfully' };
};

export const setQuestionPublishStatusAdminService = async (questionId, isPublished) => {
  const question = await AssessmentQuestion.findById(questionId);
  if (!question) {
    const error = new Error('Question not found');
    error.statusCode = 404;
    throw error;
  }

  question.status = isPublished ? 'published' : 'draft';
  await question.save();
  return question;
};

/* ==========================================================================
   7. DEBUG ARENA CHALLENGES ADMIN SERVICE
   ========================================================================== */

export const getDebugChallengesAdminService = async ({ page = 1, limit = 10, search = '', status, bugType, language, difficulty }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (status) query.status = status;
  if (bugType) query.bugType = bugType;
  if (language) query.language = language;
  if (difficulty) query.difficulty = difficulty;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  const [challenges, total] = await Promise.all([
    DebugChallenge.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    DebugChallenge.countDocuments(query),
  ]);

  return {
    challenges,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getDebugChallengeByIdAdminService = async (challengeId) => {
  const challenge = await DebugChallenge.findById(challengeId);
  if (!challenge) {
    const error = new Error('Debug challenge not found');
    error.statusCode = 404;
    throw error;
  }
  return challenge;
};

export const createDebugChallengeAdminService = async (data) => {
  const challenge = await DebugChallenge.create({
    title: data.title.trim(),
    description: data.description.trim(),
    bugType: data.bugType,
    difficulty: data.difficulty || 'Beginner',
    language: data.language,
    buggyCode: data.buggyCode,
    solutionCode: data.solutionCode,
    testCases: data.testCases || [],
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    status: data.status || 'published',
  });

  return challenge;
};

export const updateDebugChallengeAdminService = async (challengeId, data) => {
  const challenge = await DebugChallenge.findById(challengeId);
  if (!challenge) {
    const error = new Error('Debug challenge not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.title) challenge.title = data.title.trim();
  if (data.description) challenge.description = data.description.trim();
  if (data.bugType) challenge.bugType = data.bugType;
  if (data.difficulty) challenge.difficulty = data.difficulty;
  if (data.language) challenge.language = data.language;
  if (data.buggyCode) challenge.buggyCode = data.buggyCode;
  if (data.solutionCode) challenge.solutionCode = data.solutionCode;
  if (data.testCases) challenge.testCases = data.testCases;
  if (data.isActive !== undefined) challenge.isActive = Boolean(data.isActive);
  if (data.status) {
    challenge.status = data.status;
    challenge.isActive = data.status === 'published';
  }

  await challenge.save();
  return challenge;
};

export const deleteDebugChallengeAdminService = async (challengeId) => {
  const challenge = await DebugChallenge.findById(challengeId);
  if (!challenge) {
    const error = new Error('Debug challenge not found');
    error.statusCode = 404;
    throw error;
  }

  await DebugChallenge.findByIdAndDelete(challengeId);
  return { id: challengeId, message: 'Debug challenge deleted successfully' };
};

export const setDebugChallengePublishStatusAdminService = async (challengeId, isPublished) => {
  const challenge = await DebugChallenge.findById(challengeId);
  if (!challenge) {
    const error = new Error('Debug challenge not found');
    error.statusCode = 404;
    throw error;
  }

  challenge.status = isPublished ? 'published' : 'draft';
  challenge.isActive = isPublished;
  await challenge.save();
  return challenge;
};

/* ==========================================================================
   8. WEEKLY TESTS ADMIN SERVICE
   ========================================================================== */

export const getWeeklyTestsAdminService = async ({ page = 1, limit = 10, search = '', status }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (status) query.status = status;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  const [tests, total] = await Promise.all([
    WeeklyTest.find(query)
      .populate('questions')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    WeeklyTest.countDocuments(query),
  ]);

  return {
    tests,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getWeeklyTestByIdAdminService = async (testId) => {
  const test = await WeeklyTest.findById(testId).populate('questions');
  if (!test) {
    const error = new Error('Weekly test not found');
    error.statusCode = 404;
    throw error;
  }
  return test;
};

export const createWeeklyTestAdminService = async (data) => {
  const test = await WeeklyTest.create({
    title: data.title.trim(),
    description: data.description.trim(),
    durationMinutes: Number(data.durationMinutes),
    questions: data.questions || [],
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    status: data.status || 'published',
  });

  return test;
};

export const updateWeeklyTestAdminService = async (testId, data) => {
  const test = await WeeklyTest.findById(testId);
  if (!test) {
    const error = new Error('Weekly test not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.title) test.title = data.title.trim();
  if (data.description) test.description = data.description.trim();
  if (data.durationMinutes !== undefined) test.durationMinutes = Number(data.durationMinutes);
  if (data.questions) test.questions = data.questions;
  if (data.isActive !== undefined) test.isActive = Boolean(data.isActive);
  if (data.status) {
    test.status = data.status;
    test.isActive = data.status === 'published';
  }

  await test.save();
  return test;
};

export const deleteWeeklyTestAdminService = async (testId) => {
  const test = await WeeklyTest.findById(testId);
  if (!test) {
    const error = new Error('Weekly test not found');
    error.statusCode = 404;
    throw error;
  }

  await WeeklyTest.findByIdAndDelete(testId);
  return { id: testId, message: 'Weekly test deleted successfully' };
};

export const setWeeklyTestPublishStatusAdminService = async (testId, isPublished) => {
  const test = await WeeklyTest.findById(testId);
  if (!test) {
    const error = new Error('Weekly test not found');
    error.statusCode = 404;
    throw error;
  }

  test.status = isPublished ? 'published' : 'draft';
  test.isActive = isPublished;
  await test.save();
  return test;
};

/* ==========================================================================
   9. COMPETITIONS ADMIN SERVICE
   ========================================================================== */

export const getCompetitionsAdminService = async ({ page = 1, limit = 10, search = '', status }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (status) query.status = status;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  const [competitions, total] = await Promise.all([
    Competition.find(query)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limitNum),
    Competition.countDocuments(query),
  ]);

  return {
    competitions,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getCompetitionByIdAdminService = async (competitionId) => {
  const competition = await Competition.findById(competitionId);
  if (!competition) {
    const error = new Error('Competition not found');
    error.statusCode = 404;
    throw error;
  }
  return competition;
};

export const createCompetitionAdminService = async (data) => {
  const competition = await Competition.create({
    title: data.title.trim(),
    description: data.description.trim(),
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    status: data.status || 'published',
  });

  return competition;
};

export const updateCompetitionAdminService = async (competitionId, data) => {
  const competition = await Competition.findById(competitionId);
  if (!competition) {
    const error = new Error('Competition not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.title) competition.title = data.title.trim();
  if (data.description) competition.description = data.description.trim();
  if (data.startTime) competition.startTime = new Date(data.startTime);
  if (data.endTime) competition.endTime = new Date(data.endTime);
  if (data.isActive !== undefined) competition.isActive = Boolean(data.isActive);
  if (data.status) {
    competition.status = data.status;
    competition.isActive = data.status === 'published';
  }

  await competition.save();
  return competition;
};

export const deleteCompetitionAdminService = async (competitionId) => {
  const competition = await Competition.findById(competitionId);
  if (!competition) {
    const error = new Error('Competition not found');
    error.statusCode = 404;
    throw error;
  }

  await Competition.findByIdAndDelete(competitionId);
  return { id: competitionId, message: 'Competition deleted successfully' };
};

export const setCompetitionPublishStatusAdminService = async (competitionId, isPublished) => {
  const competition = await Competition.findById(competitionId);
  if (!competition) {
    const error = new Error('Competition not found');
    error.statusCode = 404;
    throw error;
  }

  competition.status = isPublished ? 'published' : 'draft';
  competition.isActive = isPublished;
  await competition.save();
  return competition;
};

/* ==========================================================================
   10. BATCHES & PRICES ADMIN SERVICE
   ========================================================================== */

export const getBatchesAdminService = async ({ page = 1, limit = 10, search = '', status }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (status) query.status = status;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: searchRegex }, { description: searchRegex }];
  }

  const [batches, total] = await Promise.all([
    Batch.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Batch.countDocuments(query),
  ]);

  return {
    batches,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getBatchByIdAdminService = async (batchId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }
  return batch;
};

export const createBatchAdminService = async (data) => {
  const batch = await Batch.create({
    name: data.name.trim(),
    description: data.description ? data.description.trim() : '',
    features: Array.isArray(data.features) ? data.features : (data.features ? String(data.features).split(',').map(f => f.trim()) : []),
    price: Number(data.price),
    currency: data.currency || '₹',
    status: data.status || 'active',
  });

  return batch;
};

export const updateBatchAdminService = async (batchId, data) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  if (data.name) batch.name = data.name.trim();
  if (data.description !== undefined) batch.description = data.description.trim();
  if (data.features !== undefined) {
    batch.features = Array.isArray(data.features) ? data.features : String(data.features).split(',').map(f => f.trim());
  }
  if (data.price !== undefined) batch.price = Number(data.price);
  if (data.currency !== undefined) batch.currency = data.currency;
  if (data.status) batch.status = data.status;

  await batch.save();
  return batch;
};

export const updateBatchPriceAdminService = async (batchId, newPrice, currency) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  batch.price = Number(newPrice);
  if (currency) batch.currency = currency;

  await batch.save();
  // Note: Updating batch.price does NOT modify any existing Purchase documents, preserving immutable historical amountPaid
  return batch;
};

export const deleteBatchAdminService = async (batchId) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }

  await Batch.findByIdAndDelete(batchId);
  return { id: batchId, message: 'Batch deleted successfully' };
};

/* ==========================================================================
   11. PURCHASES & PAYMENT STATUS ADMIN SERVICE
   ========================================================================== */

export const getPurchasesAdminService = async ({ page = 1, limit = 10, search = '', paymentStatus, batch }) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const skip = (pageNum - 1) * limitNum;

  const query = {};
  if (paymentStatus) query.paymentStatus = paymentStatus;
  if (batch) query.batch = batch;

  if (search && search.trim()) {
    const searchRegex = new RegExp(search.trim(), 'i');
    query.$or = [{ orderId: searchRegex }, { paymentId: searchRegex }, { transactionId: searchRegex }];
  }

  const [purchases, total] = await Promise.all([
    Purchase.find(query)
      .populate('user', 'name email role')
      .populate('batch', 'name price currency')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Purchase.countDocuments(query),
  ]);

  return {
    purchases,
    pagination: buildPagination(total, pageNum, limitNum),
  };
};

export const getPurchaseByIdAdminService = async (purchaseId) => {
  const purchase = await Purchase.findById(purchaseId)
    .populate('user', 'name email role')
    .populate('batch', 'name price currency');
  if (!purchase) {
    const error = new Error('Purchase record not found');
    error.statusCode = 404;
    throw error;
  }
  return purchase;
};

export const verifyPurchaseStatusAdminService = async (purchaseId) => {
  const purchase = await Purchase.findById(purchaseId)
    .populate('user', 'name email role')
    .populate('batch', 'name price currency');
  if (!purchase) {
    const error = new Error('Purchase record not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    id: purchase._id,
    orderId: purchase.orderId,
    paymentId: purchase.paymentId,
    transactionId: purchase.transactionId,
    paymentStatus: purchase.paymentStatus,
    isVerified: purchase.paymentStatus === 'completed' && Boolean(purchase.verifiedAt),
    verifiedAt: purchase.verifiedAt,
    amountPaid: purchase.amountPaid,
    currency: purchase.currency,
    purchasedAt: purchase.purchasedAt,
    user: purchase.user,
    batch: purchase.batch,
  };
};
