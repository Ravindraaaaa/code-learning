import { sendSuccess } from '../utils/apiResponse.js';
import { getGlobalLeaderboardService } from '../services/leaderboardService.js';

export const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await getGlobalLeaderboardService();
    return sendSuccess(res, 200, 'Leaderboard retrieved successfully', leaderboard);
  } catch (error) {
    next(error);
  }
};
