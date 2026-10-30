import { sendSuccess, sendError } from '../utils/apiResponse.js';
import codeExecutionService from '../services/codeExecutionService.js';
import { User, PracticeSubmission } from '../models/index.js';
import { isDBConnected } from '../config/db.js';
import { logger } from '../utils/logger.js';

// In-memory fallback for local dev / tests when MongoDB is not connected
const inMemorySubmissions = [];

/**
 * Execute code against provided test cases or raw input (Run Code)
 */
export const executeCode = async (req, res, next) => {
  try {
    const { language, code, input, testCases: requestTestCases } = req.body;
    if (!language || !code) {
      const error = new Error('Language and code are required');
      error.statusCode = 400;
      throw error;
    }

    // If test cases are provided (e.g. Run Code against sample test cases), evaluate against them
    if (Array.isArray(requestTestCases) && requestTestCases.length > 0) {
      const result = await codeExecutionService.submit(language, code, requestTestCases);
      return sendSuccess(res, 200, 'Code executed against test cases', result);
    }

    const result = await codeExecutionService.execute(language, code, input);
    return sendSuccess(res, 200, 'Code executed successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * Helper to determine genuine submission status
 */
const determineSubmissionStatus = (result) => {
  if (result.status === 'compile_error') {
    return 'Compilation Error';
  }
  if (result.status === 'timeout' || (result.details && result.details.some(d => d.status === 'timeout'))) {
    return 'Time Limit Exceeded';
  }
  if (result.status === 'runtime_error' || (result.details && result.details.some(d => d.status === 'runtime_error'))) {
    return 'Runtime Error';
  }
  if (result.passed) {
    return 'Accepted';
  }
  return 'Wrong Answer';
};

/**
 * Submit code against all test cases and record genuine submission
 */
export const submitCode = async (req, res, next) => {
  try {
    const { language, code, questionId, questionNumber, questionTitle, testCases: requestTestCases } = req.body;
    if (!language || !code) {
      const error = new Error('Language and code are required');
      error.statusCode = 400;
      throw error;
    }

    const testCases = Array.isArray(requestTestCases) && requestTestCases.length > 0
      ? requestTestCases
      : [];

    // Evaluate code against all configured test cases
    const result = await codeExecutionService.submit(language, code, testCases);
    const submissionStatus = determineSubmissionStatus(result);

    // Calculate aggregate runtime
    let totalRuntime = 0;
    if (result.details && Array.isArray(result.details)) {
      totalRuntime = result.details.reduce((acc, d) => acc + (d.runtimeMs || 0), 0);
    }
    const avgRuntime = result.details?.length ? Math.round(totalRuntime / result.details.length) : 0;

    const userId = req.user ? (req.user.id || req.user._id) : null;
    let savedSubmission = null;

    // Save genuine submission record for authenticated student
    if (userId) {
      const submissionData = {
        user: userId,
        questionId: String(questionId || '1'),
        questionNumber: Number(questionNumber || questionId || 1),
        questionTitle: String(questionTitle || `DSA Problem #${questionId || 1}`).trim(),
        language: String(language).toLowerCase().trim(),
        code: String(code),
        status: submissionStatus,
        score: Number(result.score || 0),
        passedTestCases: Number(result.passedTestCases || 0),
        totalTestCases: Number(result.totalTestCases || testCases.length || 0),
        runtimeMs: avgRuntime,
        error: result.error || (result.details?.find(d => d.error)?.error) || null,
        testCases: (result.details || []).map((d, idx) => ({
          id: d.id || idx + 1,
          name: testCases[idx]?.name || `Case ${idx + 1}`,
          input: d.input || '',
          expected: d.expected || '',
          actual: d.actual || '',
          passed: Boolean(d.passed),
          status: d.status || (d.passed ? 'completed' : 'failed'),
          runtimeMs: Number(d.runtimeMs || 0),
          error: d.error || null
        })),
        submittedAt: new Date()
      };

      if (isDBConnected()) {
        try {
          savedSubmission = await PracticeSubmission.create(submissionData);
        } catch (dbErr) {
          logger.error(`[submitCode] Failed to create PracticeSubmission in MongoDB: ${dbErr.message}`);
        }
      } else {
        // Fallback for non-connected test/dev environment
        const fallbackDoc = {
          _id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          ...submissionData,
          createdAt: submissionData.submittedAt
        };
        inMemorySubmissions.unshift(fallbackDoc);
        savedSubmission = fallbackDoc;
      }

      // If and ONLY IF submission is Accepted (100% test cases passed), record activity in profile
      if (submissionStatus === 'Accepted' && isDBConnected()) {
        try {
          const user = await User.findById(userId);
          if (user) {
            if (!Array.isArray(user.recentActivity)) {
              user.recentActivity = [];
            }

            const qTitle = submissionData.questionTitle;
            const titleText = `Solved: ${qTitle}`;

            // Avoid duplicate activity entry if recently logged
            const alreadyLogged = user.recentActivity.slice(0, 5).some(a => a.title === titleText);
            if (!alreadyLogged) {
              user.recentActivity.unshift({
                activityType: 'problem_solved',
                title: titleText,
                detail: `Passed all test cases for ${qTitle} in ${String(language).toUpperCase()} with 100% score.`,
                timestamp: new Date()
              });

              if (user.recentActivity.length > 20) {
                user.recentActivity = user.recentActivity.slice(0, 20);
              }
              await user.save();
            }
          }
        } catch (dbErr) {
          logger.error(`[submitCode] Failed to record problem solved in database: ${dbErr.message}`);
        }
      }
    }

    return sendSuccess(res, 200, 'Code submitted successfully', {
      ...result,
      submissionId: savedSubmission ? (savedSubmission._id || savedSubmission.id) : null,
      submissionStatus,
      runtimeMs: avgRuntime,
      submittedAt: savedSubmission ? savedSubmission.submittedAt : new Date()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get authenticated student's submission history with filters
 */
export const getSubmissions = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { questionId, language, status, page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Filter criteria strictly scoped to logged in user
    const filter = { user: userId };
    if (questionId) filter.questionId = String(questionId);
    if (language && language !== 'All') filter.language = String(language).toLowerCase().trim();
    if (status && status !== 'All') filter.status = String(status).trim();

    if (isDBConnected()) {
      const [submissions, total] = await Promise.all([
        PracticeSubmission.find(filter)
          .sort({ submittedAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .select('-code'), // exclude full code in list for performance
        PracticeSubmission.countDocuments(filter)
      ]);

      return sendSuccess(res, 200, 'Submissions retrieved successfully', {
        submissions,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum) || 1
        }
      });
    }

    // In-memory fallback
    const filtered = inMemorySubmissions.filter(s => {
      if (String(s.user) !== String(userId)) return false;
      if (questionId && String(s.questionId) !== String(questionId)) return false;
      if (language && language !== 'All' && s.language !== language.toLowerCase().trim()) return false;
      if (status && status !== 'All' && s.status !== status.trim()) return false;
      return true;
    });

    const paginated = filtered.slice(skip, skip + limitNum).map(s => {
      const { code, ...rest } = s;
      return rest;
    });

    return sendSuccess(res, 200, 'Submissions retrieved successfully', {
      submissions: paginated,
      pagination: {
        total: filtered.length,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(filtered.length / limitNum) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get detailed view of a single submission (including code & testcases)
 */
export const getSubmissionById = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { id } = req.params;

    if (isDBConnected()) {
      const submission = await PracticeSubmission.findById(id);
      if (!submission) {
        return sendError(res, 404, 'Submission not found');
      }

      // Security check: ensure student can access only their own submission
      if (submission.user.toString() !== userId.toString()) {
        return sendError(res, 403, 'Forbidden: You can only access your own submissions');
      }

      return sendSuccess(res, 200, 'Submission details retrieved', submission);
    }

    // In-memory fallback
    const submission = inMemorySubmissions.find(s => String(s._id) === String(id));
    if (!submission) {
      return sendError(res, 404, 'Submission not found');
    }
    if (String(submission.user) !== String(userId)) {
      return sendError(res, 403, 'Forbidden: You can only access your own submissions');
    }

    return sendSuccess(res, 200, 'Submission details retrieved', submission);
  } catch (error) {
    next(error);
  }
};

/**
 * Get authenticated student's real submission statistics
 */
export const getSubmissionStats = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;

    if (isDBConnected()) {
      const submissions = await PracticeSubmission.find({ user: userId }).select('status questionId language');
      const total = submissions.length;
      const accepted = submissions.filter(s => s.status === 'Accepted').length;
      const uniqueSolved = new Set(submissions.filter(s => s.status === 'Accepted').map(s => s.questionId)).size;

      const languages = {};
      submissions.forEach(s => {
        languages[s.language] = (languages[s.language] || 0) + 1;
      });

      return sendSuccess(res, 200, 'Submission statistics retrieved', {
        totalSubmissions: total,
        acceptedSubmissions: accepted,
        acceptanceRate: total > 0 ? Math.round((accepted / total) * 100) : 0,
        uniqueProblemsSolved: uniqueSolved,
        languages
      });
    }

    // In-memory fallback
    const userSubs = inMemorySubmissions.filter(s => String(s.user) === String(userId));
    const total = userSubs.length;
    const accepted = userSubs.filter(s => s.status === 'Accepted').length;
    const uniqueSolved = new Set(userSubs.filter(s => s.status === 'Accepted').map(s => s.questionId)).size;

    const languages = {};
    userSubs.forEach(s => {
      languages[s.language] = (languages[s.language] || 0) + 1;
    });

    return sendSuccess(res, 200, 'Submission statistics retrieved', {
      totalSubmissions: total,
      acceptedSubmissions: accepted,
      acceptanceRate: total > 0 ? Math.round((accepted / total) * 100) : 0,
      uniqueProblemsSolved: uniqueSolved,
      languages
    });
  } catch (error) {
    next(error);
  }
};
