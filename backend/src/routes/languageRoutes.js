import { Router } from 'express';
import { getLanguages, getLanguageDetails } from '../controllers/languageController.js';

const router = Router();

// GET /api/v1/languages
router.get('/', getLanguages);

// GET /api/v1/languages/:slug
router.get('/:slug', getLanguageDetails);

export default router;
