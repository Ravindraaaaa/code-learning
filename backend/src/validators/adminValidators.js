/**
 * Input Validators for Admin CRUD Operations
 * Validates request payload structures for Students, Languages, Tracks, and Topics.
 */

export const validateCreateStudentInput = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Student name is required and must be at least 2 characters long.',
      error: 'INVALID_NAME',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(String(email).toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: 'A valid email address is required.',
      error: 'INVALID_EMAIL',
    });
  }

  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password is required and must be at least 8 characters long.',
      error: 'INVALID_PASSWORD',
    });
  }

  next();
};

export const validateUpdateStudentInput = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
    return res.status(400).json({
      success: false,
      message: 'Student name must be at least 2 characters long.',
      error: 'INVALID_NAME',
    });
  }

  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
        error: 'INVALID_EMAIL',
      });
    }
  }

  if (password !== undefined && (typeof password !== 'string' || password.length < 8)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long.',
      error: 'INVALID_PASSWORD',
    });
  }

  next();
};

export const validateCreateLanguageInput = (req, res, next) => {
  const { name, slug, version, fileExtension, monacoMode } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Language name is required.',
      error: 'INVALID_LANGUAGE_NAME',
    });
  }

  if (!slug || typeof slug !== 'string' || !slug.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Language slug is required.',
      error: 'INVALID_LANGUAGE_SLUG',
    });
  }

  if (!version || typeof version !== 'string' || !version.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Language version is required.',
      error: 'INVALID_LANGUAGE_VERSION',
    });
  }

  if (!fileExtension || typeof fileExtension !== 'string' || !fileExtension.trim()) {
    return res.status(400).json({
      success: false,
      message: 'File extension is required.',
      error: 'INVALID_FILE_EXTENSION',
    });
  }

  if (!monacoMode || typeof monacoMode !== 'string' || !monacoMode.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Monaco mode is required.',
      error: 'INVALID_MONACO_MODE',
    });
  }

  next();
};

export const validateCreateTrackInput = (req, res, next) => {
  const { name, slug, description, modules } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Track name is required.',
      error: 'INVALID_TRACK_NAME',
    });
  }

  if (!slug || typeof slug !== 'string' || !slug.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Track slug is required.',
      error: 'INVALID_TRACK_SLUG',
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Track description is required.',
      error: 'INVALID_TRACK_DESCRIPTION',
    });
  }

  if (modules !== undefined && (!Array.isArray(modules) || modules.length === 0)) {
    return res.status(400).json({
      success: false,
      message: 'Track modules must be a non-empty array.',
      error: 'INVALID_TRACK_MODULES',
    });
  }

  next();
};

export const validateCreateTopicInput = (req, res, next) => {
  const { title, description, order } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Topic title is required.',
      error: 'INVALID_TOPIC_TITLE',
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Topic description is required.',
      error: 'INVALID_TOPIC_DESCRIPTION',
    });
  }

  if (order === undefined || isNaN(Number(order))) {
    return res.status(400).json({
      success: false,
      message: 'Topic order is required and must be a valid number.',
      error: 'INVALID_TOPIC_ORDER',
    });
  }

  next();
};

export const validateCreateLessonInput = (req, res, next) => {
  const { title, content, topic, order } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Lesson title is required.',
      error: 'INVALID_LESSON_TITLE',
    });
  }

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Lesson content is required.',
      error: 'INVALID_LESSON_CONTENT',
    });
  }

  if (!topic) {
    return res.status(400).json({
      success: false,
      message: 'Topic reference is required.',
      error: 'INVALID_LESSON_TOPIC',
    });
  }

  if (order === undefined || isNaN(Number(order))) {
    return res.status(400).json({
      success: false,
      message: 'Lesson order is required and must be a valid number.',
      error: 'INVALID_LESSON_ORDER',
    });
  }

  next();
};

export const validateCreateQuestionInput = (req, res, next) => {
  const { questionText, options, correctOptionIndex } = req.body || {};

  if (!questionText || typeof questionText !== 'string' || !questionText.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Question text is required.',
      error: 'INVALID_QUESTION_TEXT',
    });
  }

  if (!Array.isArray(options) || options.length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Question options must be an array with at least 2 choices.',
      error: 'INVALID_QUESTION_OPTIONS',
    });
  }

  if (
    correctOptionIndex === undefined ||
    isNaN(Number(correctOptionIndex)) ||
    Number(correctOptionIndex) < 0 ||
    Number(correctOptionIndex) >= options.length
  ) {
    return res.status(400).json({
      success: false,
      message: 'Valid correct option index is required.',
      error: 'INVALID_CORRECT_OPTION_INDEX',
    });
  }

  next();
};

export const validateCreateDebugChallengeInput = (req, res, next) => {
  const { title, description, bugType, language, buggyCode, solutionCode } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Challenge title is required.',
      error: 'INVALID_CHALLENGE_TITLE',
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Challenge description is required.',
      error: 'INVALID_CHALLENGE_DESCRIPTION',
    });
  }

  if (!bugType || !['Syntax', 'Logical', 'Runtime'].includes(bugType)) {
    return res.status(400).json({
      success: false,
      message: 'Bug type must be one of Syntax, Logical, or Runtime.',
      error: 'INVALID_BUG_TYPE',
    });
  }

  if (!language || typeof language !== 'string' || !language.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Programming language is required.',
      error: 'INVALID_LANGUAGE',
    });
  }

  if (!buggyCode || typeof buggyCode !== 'string' || !buggyCode.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Buggy code snippet is required.',
      error: 'INVALID_BUGGY_CODE',
    });
  }

  if (!solutionCode || typeof solutionCode !== 'string' || !solutionCode.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Solution code snippet is required.',
      error: 'INVALID_SOLUTION_CODE',
    });
  }

  next();
};

export const validateCreateWeeklyTestInput = (req, res, next) => {
  const { title, description, durationMinutes } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Weekly test title is required.',
      error: 'INVALID_TEST_TITLE',
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Weekly test description is required.',
      error: 'INVALID_TEST_DESCRIPTION',
    });
  }

  if (!durationMinutes || isNaN(Number(durationMinutes)) || Number(durationMinutes) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Test duration in minutes must be a positive number.',
      error: 'INVALID_TEST_DURATION',
    });
  }

  next();
};

export const validateCreateCompetitionInput = (req, res, next) => {
  const { title, description, startTime, endTime } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Competition title is required.',
      error: 'INVALID_COMPETITION_TITLE',
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Competition description is required.',
      error: 'INVALID_COMPETITION_DESCRIPTION',
    });
  }

  if (!startTime || isNaN(Date.parse(startTime))) {
    return res.status(400).json({
      success: false,
      message: 'Valid start time ISO date string is required.',
      error: 'INVALID_START_TIME',
    });
  }

  if (!endTime || isNaN(Date.parse(endTime))) {
    return res.status(400).json({
      success: false,
      message: 'Valid end time ISO date string is required.',
      error: 'INVALID_END_TIME',
    });
  }

  next();
};

export const validateCreateBatchInput = (req, res, next) => {
  const { name, price } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Batch name is required.',
      error: 'INVALID_BATCH_NAME',
    });
  }

  if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: 'Batch price is required and cannot be negative.',
      error: 'INVALID_BATCH_PRICE',
    });
  }

  next();
};

export const validateUpdateBatchPriceInput = (req, res, next) => {
  const { price } = req.body || {};

  if (price === undefined || isNaN(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: 'A valid non-negative price is required.',
      error: 'INVALID_PRICE',
    });
  }

  next();
};
