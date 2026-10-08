import { body } from 'express-validator';

export const validateAssessmentSubmit = [
  body('track').optional().isMongoId().withMessage('Invalid track ID'),
  body('language').optional().isMongoId().withMessage('Invalid language ID'),
  body('answers').isArray().withMessage('Answers must be an array'),
  body('answers.*.questionId').isMongoId().withMessage('Invalid question ID'),
  body('answers.*.selectedOptionIndex').isInt({ min: 0 }).withMessage('Selected option index must be a non-negative integer'),
  body('startedAt').optional().isISO8601().toDate().withMessage('startedAt must be a valid date'),
];

export const validateQuestionInput = [
  body('track').optional().isMongoId().withMessage('Invalid track ID'),
  body('language').optional().isMongoId().withMessage('Invalid language ID'),
  body('questionText').trim().notEmpty().withMessage('Question text is required'),
  body('options').isArray({ min: 2 }).withMessage('At least 2 options are required'),
  body('correctOptionIndex').isInt({ min: 0 }).withMessage('Correct option index must be a valid array index'),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Difficulty must be Beginner, Intermediate, or Advanced'),
];
