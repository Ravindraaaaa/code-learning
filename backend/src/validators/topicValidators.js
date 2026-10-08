import { body } from 'express-validator';

export const validateTopicInput = [
  body('title').trim().notEmpty().withMessage('Topic title is required'),
  body('description').trim().notEmpty().withMessage('Topic description is required'),
  body('order').isInt({ min: 1 }).withMessage('Order must be a positive integer'),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Difficulty must be Beginner, Intermediate, or Advanced'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be draft or published'),
];
