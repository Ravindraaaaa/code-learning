import {
  getAllLanguages,
  getLanguageBySlug,
  selectStudentLanguage,
  getStudentSelectedLanguage,
} from '../services/languageService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * GET /api/v1/languages
 * Public / authenticated endpoint to retrieve all supported programming languages.
 */
export const getLanguages = async (req, res, next) => {
  try {
    const languages = await getAllLanguages({ activeOnly: true });
    return sendSuccess(res, 200, 'Programming languages retrieved successfully', languages);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/languages/:slug
 * Retrieve specific language details by slug.
 */
export const getLanguageDetails = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const language = await getLanguageBySlug(slug);

    if (!language) {
      return res.status(404).json({
        success: false,
        message: `Language '${slug}' not found`,
        data: null,
      });
    }

    return sendSuccess(res, 200, 'Language details retrieved successfully', language);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/student/language
 * Retrieve currently selected language for authenticated student.
 */
export const getStudentLanguage = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await getStudentSelectedLanguage(userId);
    return sendSuccess(res, 200, 'Student language preference retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/student/language or PUT /api/v1/student/language
 * Select preferred programming language for authenticated student.
 */
export const selectLanguage = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const languageSlug = req.body?.languageSlug || req.body?.slug;

    if (!languageSlug) {
      return res.status(400).json({
        success: false,
        message: 'languageSlug is required in request body',
        errors: { languageSlug: 'Please provide a valid language slug (e.g. c, cpp, java, python, javascript)' },
      });
    }

    const result = await selectStudentLanguage(userId, languageSlug);
    return sendSuccess(
      res,
      200,
      `Primary programming language updated to ${result.selectedLanguage.name}`,
      result
    );
  } catch (error) {
    next(error);
  }
};
