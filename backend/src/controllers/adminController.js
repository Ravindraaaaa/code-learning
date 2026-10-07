import { User, Language } from '../models/index.js';
import { isDevFallbackActive } from '../config/db.js';
import { sendSuccess } from '../utils/apiResponse.js';

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
