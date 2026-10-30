import { getStudentDashboardData } from '../services/dashboardService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Handle GET /api/v1/student/dashboard
 * Returns real database-driven metrics for the authenticated student.
 */
export const getDashboard = async (req, res, next) => {
  try {
    const dashboardData = await getStudentDashboardData(req.user.id, req.user.email);

    return sendSuccess(
      res,
      200,
      'Student dashboard retrieved successfully',
      dashboardData
    );
  } catch (error) {
    next(error);
  }
};
