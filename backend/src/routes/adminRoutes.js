import { Router } from 'express';
import {
  getAdminOverview,
  getStudentsAdmin,
  getStudentByIdAdmin,
  createStudentAdmin,
  updateStudentAdmin,
  deleteStudentAdmin,
  getLanguagesAdmin,
  getLanguageByIdAdmin,
  createLanguageAdmin,
  updateLanguageAdmin,
  deleteLanguageAdmin,
  getTracksAdmin,
  getTrackByIdAdmin,
  createTrackAdmin,
  updateTrackAdmin,
  deleteTrackAdmin,
  getTopicsAdmin,
  getTopicByIdAdmin,
  createTopicAdmin,
  updateTopicAdmin,
  deleteTopicAdmin,
  getLessonsAdmin,
  getLessonByIdAdmin,
  createLessonAdmin,
  updateLessonAdmin,
  deleteLessonAdmin,
  publishLessonAdmin,
  unpublishLessonAdmin,
  getQuestionsAdmin,
  getQuestionByIdAdmin,
  createQuestionAdmin,
  updateQuestionAdmin,
  deleteQuestionAdmin,
  publishQuestionAdmin,
  unpublishQuestionAdmin,
  getDebugChallengesAdmin,
  getDebugChallengeByIdAdmin,
  createDebugChallengeAdmin,
  updateDebugChallengeAdmin,
  deleteDebugChallengeAdmin,
  publishDebugChallengeAdmin,
  unpublishDebugChallengeAdmin,
  getWeeklyTestsAdmin,
  getWeeklyTestByIdAdmin,
  createWeeklyTestAdmin,
  updateWeeklyTestAdmin,
  deleteWeeklyTestAdmin,
  publishWeeklyTestAdmin,
  unpublishWeeklyTestAdmin,
  getCompetitionsAdmin,
  getCompetitionByIdAdmin,
  createCompetitionAdmin,
  updateCompetitionAdmin,
  deleteCompetitionAdmin,
  publishCompetitionAdmin,
  unpublishCompetitionAdmin,
  getBatchesAdmin,
  getBatchByIdAdmin,
  createBatchAdmin,
  updateBatchAdmin,
  updateBatchPriceAdmin,
  deleteBatchAdmin,
  getPurchasesAdmin,
  getPurchaseByIdAdmin,
  verifyPurchaseStatusAdmin,
} from '../controllers/adminController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import {
  validateCreateStudentInput,
  validateUpdateStudentInput,
  validateCreateLanguageInput,
  validateCreateTrackInput,
  validateCreateTopicInput,
  validateCreateLessonInput,
  validateCreateQuestionInput,
  validateCreateDebugChallengeInput,
  validateCreateWeeklyTestInput,
  validateCreateCompetitionInput,
  validateCreateBatchInput,
  validateUpdateBatchPriceInput,
} from '../validators/adminValidators.js';

const router = Router();

// Protect ALL admin endpoints with JWT authentication and Admin role enforcement
router.use(requireAuth, requireAdmin);

// Admin System Overview
router.get('/overview', getAdminOverview);

/* ==========================================================================
   1. STUDENTS ADMIN ROUTES
   ========================================================================== */
router.get('/students', getStudentsAdmin);
router.get('/students/:id', getStudentByIdAdmin);
router.post('/students', validateCreateStudentInput, createStudentAdmin);
router.put('/students/:id', validateUpdateStudentInput, updateStudentAdmin);
router.delete('/students/:id', deleteStudentAdmin);

/* ==========================================================================
   2. LANGUAGES ADMIN ROUTES
   ========================================================================== */
router.get('/languages', getLanguagesAdmin);
router.get('/languages/:id', getLanguageByIdAdmin);
router.post('/languages', validateCreateLanguageInput, createLanguageAdmin);
router.put('/languages/:id', updateLanguageAdmin);
router.delete('/languages/:id', deleteLanguageAdmin);

/* ==========================================================================
   3. TRACKS ADMIN ROUTES
   ========================================================================== */
router.get('/tracks', getTracksAdmin);
router.get('/tracks/:id', getTrackByIdAdmin);
router.post('/tracks', validateCreateTrackInput, createTrackAdmin);
router.put('/tracks/:id', updateTrackAdmin);
router.delete('/tracks/:id', deleteTrackAdmin);

/* ==========================================================================
   4. TOPICS ADMIN ROUTES
   ========================================================================== */
router.get('/topics', getTopicsAdmin);
router.get('/topics/:id', getTopicByIdAdmin);
router.post('/topics', validateCreateTopicInput, createTopicAdmin);
router.put('/topics/:id', updateTopicAdmin);
router.delete('/topics/:id', deleteTopicAdmin);

/* ==========================================================================
   5. LESSONS ADMIN ROUTES
   ========================================================================== */
router.get('/lessons', getLessonsAdmin);
router.get('/lessons/:id', getLessonByIdAdmin);
router.post('/lessons', validateCreateLessonInput, createLessonAdmin);
router.put('/lessons/:id', updateLessonAdmin);
router.delete('/lessons/:id', deleteLessonAdmin);
router.patch('/lessons/:id/publish', publishLessonAdmin);
router.patch('/lessons/:id/unpublish', unpublishLessonAdmin);

/* ==========================================================================
   6. QUESTIONS (ASSESSMENT QUESTIONS) ADMIN ROUTES
   ========================================================================== */
router.get('/questions', getQuestionsAdmin);
router.get('/questions/:id', getQuestionByIdAdmin);
router.post('/questions', validateCreateQuestionInput, createQuestionAdmin);
router.put('/questions/:id', updateQuestionAdmin);
router.delete('/questions/:id', deleteQuestionAdmin);
router.patch('/questions/:id/publish', publishQuestionAdmin);
router.patch('/questions/:id/unpublish', unpublishQuestionAdmin);

/* ==========================================================================
   7. DEBUG ARENA CHALLENGES ADMIN ROUTES
   ========================================================================== */
router.get('/debug-challenges', getDebugChallengesAdmin);
router.get('/debug-challenges/:id', getDebugChallengeByIdAdmin);
router.post('/debug-challenges', validateCreateDebugChallengeInput, createDebugChallengeAdmin);
router.put('/debug-challenges/:id', updateDebugChallengeAdmin);
router.delete('/debug-challenges/:id', deleteDebugChallengeAdmin);
router.patch('/debug-challenges/:id/publish', publishDebugChallengeAdmin);
router.patch('/debug-challenges/:id/unpublish', unpublishDebugChallengeAdmin);

/* ==========================================================================
   8. WEEKLY TESTS ADMIN ROUTES
   ========================================================================== */
router.get('/weekly-tests', getWeeklyTestsAdmin);
router.get('/weekly-tests/:id', getWeeklyTestByIdAdmin);
router.post('/weekly-tests', validateCreateWeeklyTestInput, createWeeklyTestAdmin);
router.put('/weekly-tests/:id', updateWeeklyTestAdmin);
router.delete('/weekly-tests/:id', deleteWeeklyTestAdmin);
router.patch('/weekly-tests/:id/publish', publishWeeklyTestAdmin);
router.patch('/weekly-tests/:id/unpublish', unpublishWeeklyTestAdmin);

/* ==========================================================================
   9. COMPETITIONS ADMIN ROUTES
   ========================================================================== */
router.get('/competitions', getCompetitionsAdmin);
router.get('/competitions/:id', getCompetitionByIdAdmin);
router.post('/competitions', validateCreateCompetitionInput, createCompetitionAdmin);
router.put('/competitions/:id', updateCompetitionAdmin);
router.delete('/competitions/:id', deleteCompetitionAdmin);
router.patch('/competitions/:id/publish', publishCompetitionAdmin);
router.patch('/competitions/:id/unpublish', unpublishCompetitionAdmin);

/* ==========================================================================
   10. BATCHES & PRICES ADMIN ROUTES
   ========================================================================== */
router.get('/batches', getBatchesAdmin);
router.get('/batches/:id', getBatchByIdAdmin);
router.post('/batches', validateCreateBatchInput, createBatchAdmin);
router.put('/batches/:id', updateBatchAdmin);
router.put('/batches/:id/price', validateUpdateBatchPriceInput, updateBatchPriceAdmin);
router.delete('/batches/:id', deleteBatchAdmin);

/* ==========================================================================
   11. PURCHASES & PAYMENT STATUS ADMIN ROUTES
   ========================================================================== */
router.get('/purchases', getPurchasesAdmin);
router.get('/purchases/:id', getPurchaseByIdAdmin);
router.get('/purchases/:id/verify-status', verifyPurchaseStatusAdmin);
router.patch('/purchases/:id/verify-status', verifyPurchaseStatusAdmin);

/* ==========================================================================
   12. ANNOUNCEMENTS & NOTIFICATIONS ADMIN ROUTES
   ========================================================================== */
import { sendAdminAnnouncement, getAdminNotifications } from '../controllers/notificationController.js';
router.post('/notifications/announcement', sendAdminAnnouncement);
router.get('/notifications', getAdminNotifications);

export default router;
