import { body } from 'express-validator';

export const validateLessonInput = [
  body('title').trim().notEmpty().withMessage('Lesson title is required'),
  body('content').trim().notEmpty().withMessage('Lesson content is required'),
  body('topic').trim().notEmpty().withMessage('Topic ID is required'),
  body('order').isInt({ min: 1 }).withMessage('Order must be a positive integer'),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Difficulty must be Beginner, Intermediate, or Advanced'),
  body('estimatedTime')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Estimated time must be at least 1 minute'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be draft or published'),
];
