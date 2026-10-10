import { User, Language, Track, Topic } from '../models/index.js';
import { isDevFallbackActive } from '../config/db.js';
import { sendSuccess } from '../utils/apiResponse.js';
import {
  getStudentsAdminService,
  getStudentByIdAdminService,
  createStudentAdminService,
  updateStudentAdminService,
  deleteStudentAdminService,
  getLanguagesAdminService,
  getLanguageByIdAdminService,
  createLanguageAdminService,
  updateLanguageAdminService,
  deleteLanguageAdminService,
  getTracksAdminService,
  getTrackByIdAdminService,
  createTrackAdminService,
  updateTrackAdminService,
  deleteTrackAdminService,
  getTopicsAdminService,
  getTopicByIdAdminService,
  createTopicAdminService,
  updateTopicAdminService,
  deleteTopicAdminService,
  getLessonsAdminService,
  getLessonByIdAdminService,
  createLessonAdminService,
  updateLessonAdminService,
  deleteLessonAdminService,
  setLessonPublishStatusAdminService,
  getQuestionsAdminService,
  getQuestionByIdAdminService,
  createQuestionAdminService,
  updateQuestionAdminService,
  deleteQuestionAdminService,
  setQuestionPublishStatusAdminService,
  getDebugChallengesAdminService,
  getDebugChallengeByIdAdminService,
  createDebugChallengeAdminService,
  updateDebugChallengeAdminService,
  deleteDebugChallengeAdminService,
  setDebugChallengePublishStatusAdminService,
  getWeeklyTestsAdminService,
  getWeeklyTestByIdAdminService,
  createWeeklyTestAdminService,
  updateWeeklyTestAdminService,
  deleteWeeklyTestAdminService,
  setWeeklyTestPublishStatusAdminService,
  getCompetitionsAdminService,
  getCompetitionByIdAdminService,
  createCompetitionAdminService,
  updateCompetitionAdminService,
  deleteCompetitionAdminService,
  setCompetitionPublishStatusAdminService,
  getBatchesAdminService,
  getBatchByIdAdminService,
  createBatchAdminService,
  updateBatchAdminService,
  updateBatchPriceAdminService,
  deleteBatchAdminService,
  getPurchasesAdminService,
  getPurchaseByIdAdminService,
  verifyPurchaseStatusAdminService,
} from '../services/adminService.js';

/* ==========================================================================
   ADMIN OVERVIEW
   ========================================================================== */

export const getAdminOverview = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' });
    const languagesCount = await Language.countDocuments({ isActive: true });

    const sanitizedStudents = (students || []).map((s) => ({
      id: s._id,
      name: s.name,
      email: s.email,
      role: s.role,
      selectedLanguage: s.selectedLanguage || 'Not selected',
      streak: s.streak?.currentStreak || 0,
      createdAt: s.createdAt,
    }));

    const overview = {
      metrics: {
        totalStudents: sanitizedStudents.length,
        activeLanguages: languagesCount || 5,
        databaseMode: isDevFallbackActive() ? 'In-Memory Dev Store' : 'MongoDB Production',
        systemStatus: 'Operational',
      },
      students: sanitizedStudents,
    };

    return sendSuccess(res, 200, 'Admin overview data retrieved successfully', overview);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   1. STUDENTS ADMIN CONTROLLERS
   ========================================================================== */

export const getStudentsAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, role } = req.query;
    const result = await getStudentsAdminService({ page, limit, search, role });
    return sendSuccess(res, 200, 'Students list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getStudentByIdAdmin = async (req, res, next) => {
  try {
    const student = await getStudentByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Student details retrieved successfully', student);
  } catch (error) {
    next(error);
  }
};

export const createStudentAdmin = async (req, res, next) => {
  try {
    const newStudent = await createStudentAdminService(req.body);
    return sendSuccess(res, 201, 'Student created successfully', newStudent);
  } catch (error) {
    next(error);
  }
};

export const updateStudentAdmin = async (req, res, next) => {
  try {
    const updatedStudent = await updateStudentAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Student updated successfully', updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudentAdmin = async (req, res, next) => {
  try {
    const requestingAdminId = req.user.id || req.user._id;
    const result = await deleteStudentAdminService(req.params.id, requestingAdminId);
    return sendSuccess(res, 200, 'Student deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   2. LANGUAGES ADMIN CONTROLLERS
   ========================================================================== */

export const getLanguagesAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, isActive } = req.query;
    const result = await getLanguagesAdminService({ page, limit, search, isActive });
    return sendSuccess(res, 200, 'Languages list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getLanguageByIdAdmin = async (req, res, next) => {
  try {
    const language = await getLanguageByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Language details retrieved successfully', language);
  } catch (error) {
    next(error);
  }
};

export const createLanguageAdmin = async (req, res, next) => {
  try {
    const newLanguage = await createLanguageAdminService(req.body);
    return sendSuccess(res, 201, 'Language created successfully', newLanguage);
  } catch (error) {
    next(error);
  }
};

export const updateLanguageAdmin = async (req, res, next) => {
  try {
    const updatedLanguage = await updateLanguageAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Language updated successfully', updatedLanguage);
  } catch (error) {
    next(error);
  }
};

export const deleteLanguageAdmin = async (req, res, next) => {
  try {
    const result = await deleteLanguageAdminService(req.params.id);
    return sendSuccess(res, 200, 'Language deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   3. TRACKS ADMIN CONTROLLERS
   ========================================================================== */

export const getTracksAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, isActive } = req.query;
    const result = await getTracksAdminService({ page, limit, search, isActive });
    return sendSuccess(res, 200, 'Tracks list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getTrackByIdAdmin = async (req, res, next) => {
  try {
    const track = await getTrackByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Track details retrieved successfully', track);
  } catch (error) {
    next(error);
  }
};

export const createTrackAdmin = async (req, res, next) => {
  try {
    const newTrack = await createTrackAdminService(req.body);
    return sendSuccess(res, 201, 'Track created successfully', newTrack);
  } catch (error) {
    next(error);
  }
};

export const updateTrackAdmin = async (req, res, next) => {
  try {
    const updatedTrack = await updateTrackAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Track updated successfully', updatedTrack);
  } catch (error) {
    next(error);
  }
};

export const deleteTrackAdmin = async (req, res, next) => {
  try {
    const result = await deleteTrackAdminService(req.params.id);
    return sendSuccess(res, 200, 'Track deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   4. TOPICS ADMIN CONTROLLERS
   ========================================================================== */

export const getTopicsAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, language, track, difficulty, status } = req.query;
    const result = await getTopicsAdminService({
      page,
      limit,
      search,
      language,
      track,
      difficulty,
      status,
    });
    return sendSuccess(res, 200, 'Topics list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getTopicByIdAdmin = async (req, res, next) => {
  try {
    const topic = await getTopicByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Topic details retrieved successfully', topic);
  } catch (error) {
    next(error);
  }
};

export const createTopicAdmin = async (req, res, next) => {
  try {
    const newTopic = await createTopicAdminService(req.body);
    return sendSuccess(res, 201, 'Topic created successfully', newTopic);
  } catch (error) {
    next(error);
  }
};

export const updateTopicAdmin = async (req, res, next) => {
  try {
    const updatedTopic = await updateTopicAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Topic updated successfully', updatedTopic);
  } catch (error) {
    next(error);
  }
};

export const deleteTopicAdmin = async (req, res, next) => {
  try {
    const result = await deleteTopicAdminService(req.params.id);
    return sendSuccess(res, 200, 'Topic deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   5. LESSONS ADMIN CONTROLLERS
   ========================================================================== */

export const getLessonsAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, status, topic, difficulty } = req.query;
    const result = await getLessonsAdminService({ page, limit, search, status, topic, difficulty });
    return sendSuccess(res, 200, 'Lessons list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getLessonByIdAdmin = async (req, res, next) => {
  try {
    const lesson = await getLessonByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Lesson details retrieved successfully', lesson);
  } catch (error) {
    next(error);
  }
};

export const createLessonAdmin = async (req, res, next) => {
  try {
    const newLesson = await createLessonAdminService(req.body);
    return sendSuccess(res, 201, 'Lesson created successfully', newLesson);
  } catch (error) {
    next(error);
  }
};

export const updateLessonAdmin = async (req, res, next) => {
  try {
    const updatedLesson = await updateLessonAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Lesson updated successfully', updatedLesson);
  } catch (error) {
    next(error);
  }
};

export const deleteLessonAdmin = async (req, res, next) => {
  try {
    const result = await deleteLessonAdminService(req.params.id);
    return sendSuccess(res, 200, 'Lesson deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const publishLessonAdmin = async (req, res, next) => {
  try {
    const lesson = await setLessonPublishStatusAdminService(req.params.id, true);
    return sendSuccess(res, 200, 'Lesson published successfully', lesson);
  } catch (error) {
    next(error);
  }
};

export const unpublishLessonAdmin = async (req, res, next) => {
  try {
    const lesson = await setLessonPublishStatusAdminService(req.params.id, false);
    return sendSuccess(res, 200, 'Lesson unpublished successfully', lesson);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   6. QUESTIONS (ASSESSMENT QUESTIONS) ADMIN CONTROLLERS
   ========================================================================== */

export const getQuestionsAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, status, track, language, difficulty } = req.query;
    const result = await getQuestionsAdminService({ page, limit, search, status, track, language, difficulty });
    return sendSuccess(res, 200, 'Assessment questions list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getQuestionByIdAdmin = async (req, res, next) => {
  try {
    const question = await getQuestionByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Question details retrieved successfully', question);
  } catch (error) {
    next(error);
  }
};

export const createQuestionAdmin = async (req, res, next) => {
  try {
    const newQuestion = await createQuestionAdminService(req.body);
    return sendSuccess(res, 201, 'Assessment question created successfully', newQuestion);
  } catch (error) {
    next(error);
  }
};

export const updateQuestionAdmin = async (req, res, next) => {
  try {
    const updatedQuestion = await updateQuestionAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Assessment question updated successfully', updatedQuestion);
  } catch (error) {
    next(error);
  }
};

export const deleteQuestionAdmin = async (req, res, next) => {
  try {
    const result = await deleteQuestionAdminService(req.params.id);
    return sendSuccess(res, 200, 'Assessment question deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const publishQuestionAdmin = async (req, res, next) => {
  try {
    const question = await setQuestionPublishStatusAdminService(req.params.id, true);
    return sendSuccess(res, 200, 'Question published successfully', question);
  } catch (error) {
    next(error);
  }
};

export const unpublishQuestionAdmin = async (req, res, next) => {
  try {
    const question = await setQuestionPublishStatusAdminService(req.params.id, false);
    return sendSuccess(res, 200, 'Question unpublished successfully', question);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   7. DEBUG ARENA CHALLENGES ADMIN CONTROLLERS
   ========================================================================== */

export const getDebugChallengesAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, status, bugType, language, difficulty } = req.query;
    const result = await getDebugChallengesAdminService({ page, limit, search, status, bugType, language, difficulty });
    return sendSuccess(res, 200, 'Debug challenges list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getDebugChallengeByIdAdmin = async (req, res, next) => {
  try {
    const challenge = await getDebugChallengeByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Debug challenge details retrieved successfully', challenge);
  } catch (error) {
    next(error);
  }
};

export const createDebugChallengeAdmin = async (req, res, next) => {
  try {
    const newChallenge = await createDebugChallengeAdminService(req.body);
    return sendSuccess(res, 201, 'Debug challenge created successfully', newChallenge);
  } catch (error) {
    next(error);
  }
};

export const updateDebugChallengeAdmin = async (req, res, next) => {
  try {
    const updatedChallenge = await updateDebugChallengeAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Debug challenge updated successfully', updatedChallenge);
  } catch (error) {
    next(error);
  }
};

export const deleteDebugChallengeAdmin = async (req, res, next) => {
  try {
    const result = await deleteDebugChallengeAdminService(req.params.id);
    return sendSuccess(res, 200, 'Debug challenge deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const publishDebugChallengeAdmin = async (req, res, next) => {
  try {
    const challenge = await setDebugChallengePublishStatusAdminService(req.params.id, true);
    return sendSuccess(res, 200, 'Debug challenge published successfully', challenge);
  } catch (error) {
    next(error);
  }
};

export const unpublishDebugChallengeAdmin = async (req, res, next) => {
  try {
    const challenge = await setDebugChallengePublishStatusAdminService(req.params.id, false);
    return sendSuccess(res, 200, 'Debug challenge unpublished successfully', challenge);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   8. WEEKLY TESTS ADMIN CONTROLLERS
   ========================================================================== */

export const getWeeklyTestsAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;
    const result = await getWeeklyTestsAdminService({ page, limit, search, status });
    return sendSuccess(res, 200, 'Weekly tests list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getWeeklyTestByIdAdmin = async (req, res, next) => {
  try {
    const test = await getWeeklyTestByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Weekly test details retrieved successfully', test);
  } catch (error) {
    next(error);
  }
};

export const createWeeklyTestAdmin = async (req, res, next) => {
  try {
    const newTest = await createWeeklyTestAdminService(req.body);
    return sendSuccess(res, 201, 'Weekly test created successfully', newTest);
  } catch (error) {
    next(error);
  }
};

export const updateWeeklyTestAdmin = async (req, res, next) => {
  try {
    const updatedTest = await updateWeeklyTestAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Weekly test updated successfully', updatedTest);
  } catch (error) {
    next(error);
  }
};

export const deleteWeeklyTestAdmin = async (req, res, next) => {
  try {
    const result = await deleteWeeklyTestAdminService(req.params.id);
    return sendSuccess(res, 200, 'Weekly test deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const publishWeeklyTestAdmin = async (req, res, next) => {
  try {
    const test = await setWeeklyTestPublishStatusAdminService(req.params.id, true);
    return sendSuccess(res, 200, 'Weekly test published successfully', test);
  } catch (error) {
    next(error);
  }
};

export const unpublishWeeklyTestAdmin = async (req, res, next) => {
  try {
    const test = await setWeeklyTestPublishStatusAdminService(req.params.id, false);
    return sendSuccess(res, 200, 'Weekly test unpublished successfully', test);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   9. COMPETITIONS ADMIN CONTROLLERS
   ========================================================================== */

export const getCompetitionsAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;
    const result = await getCompetitionsAdminService({ page, limit, search, status });
    return sendSuccess(res, 200, 'Competitions list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getCompetitionByIdAdmin = async (req, res, next) => {
  try {
    const competition = await getCompetitionByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Competition details retrieved successfully', competition);
  } catch (error) {
    next(error);
  }
};

export const createCompetitionAdmin = async (req, res, next) => {
  try {
    const newCompetition = await createCompetitionAdminService(req.body);
    return sendSuccess(res, 201, 'Competition created successfully', newCompetition);
  } catch (error) {
    next(error);
  }
};

export const updateCompetitionAdmin = async (req, res, next) => {
  try {
    const updatedCompetition = await updateCompetitionAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Competition updated successfully', updatedCompetition);
  } catch (error) {
    next(error);
  }
};

export const deleteCompetitionAdmin = async (req, res, next) => {
  try {
    const result = await deleteCompetitionAdminService(req.params.id);
    return sendSuccess(res, 200, 'Competition deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const publishCompetitionAdmin = async (req, res, next) => {
  try {
    const competition = await setCompetitionPublishStatusAdminService(req.params.id, true);
    return sendSuccess(res, 200, 'Competition published successfully', competition);
  } catch (error) {
    next(error);
  }
};

export const unpublishCompetitionAdmin = async (req, res, next) => {
  try {
    const competition = await setCompetitionPublishStatusAdminService(req.params.id, false);
    return sendSuccess(res, 200, 'Competition unpublished successfully', competition);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   10. BATCHES & PRICES ADMIN CONTROLLERS
   ========================================================================== */

export const getBatchesAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, status } = req.query;
    const result = await getBatchesAdminService({ page, limit, search, status });
    return sendSuccess(res, 200, 'Batches list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getBatchByIdAdmin = async (req, res, next) => {
  try {
    const batch = await getBatchByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Batch details retrieved successfully', batch);
  } catch (error) {
    next(error);
  }
};

export const createBatchAdmin = async (req, res, next) => {
  try {
    const newBatch = await createBatchAdminService(req.body);
    return sendSuccess(res, 201, 'Batch created successfully', newBatch);
  } catch (error) {
    next(error);
  }
};

export const updateBatchAdmin = async (req, res, next) => {
  try {
    const updatedBatch = await updateBatchAdminService(req.params.id, req.body);
    return sendSuccess(res, 200, 'Batch updated successfully', updatedBatch);
  } catch (error) {
    next(error);
  }
};

export const updateBatchPriceAdmin = async (req, res, next) => {
  try {
    const { price, currency } = req.body;
    const updatedBatch = await updateBatchPriceAdminService(req.params.id, price, currency);
    return sendSuccess(res, 200, 'Batch price updated successfully', updatedBatch);
  } catch (error) {
    next(error);
  }
};

export const deleteBatchAdmin = async (req, res, next) => {
  try {
    const result = await deleteBatchAdminService(req.params.id);
    return sendSuccess(res, 200, 'Batch deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

/* ==========================================================================
   11. PURCHASES & PAYMENT STATUS ADMIN CONTROLLERS
   ========================================================================== */

export const getPurchasesAdmin = async (req, res, next) => {
  try {
    const { page, limit, search, paymentStatus, batch } = req.query;
    const result = await getPurchasesAdminService({ page, limit, search, paymentStatus, batch });
    return sendSuccess(res, 200, 'Student purchases list retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getPurchaseByIdAdmin = async (req, res, next) => {
  try {
    const purchase = await getPurchaseByIdAdminService(req.params.id);
    return sendSuccess(res, 200, 'Purchase details retrieved successfully', purchase);
  } catch (error) {
    next(error);
  }
};

export const verifyPurchaseStatusAdmin = async (req, res, next) => {
  try {
    const statusData = await verifyPurchaseStatusAdminService(req.params.id);
    return sendSuccess(res, 200, 'Verified payment status retrieved successfully', statusData);
  } catch (error) {
    next(error);
  }
};
