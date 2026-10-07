import {
  getAllTracks,
  getTrackBySlug,
  selectStudentTrack,
  getStudentSelectedTrack,
} from '../services/trackService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * GET /api/v1/tracks
 * Public / authenticated endpoint to retrieve all available learning tracks.
 */
export const getTracks = async (req, res, next) => {
  try {
    const tracks = await getAllTracks({ activeOnly: true });
    return sendSuccess(res, 200, 'Learning tracks retrieved successfully', tracks);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/tracks/:slug
 * Retrieve specific learning track details by slug (e.g. 'web-development').
 */
export const getTrackDetails = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const track = await getTrackBySlug(slug);

    if (!track) {
      return res.status(404).json({
        success: false,
        message: `Learning track '${slug}' not found`,
        data: null,
      });
    }

    return sendSuccess(res, 200, 'Learning track details retrieved successfully', track);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/student/track
 * Retrieve currently enrolled track for authenticated student.
 */
export const getStudentTrack = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const result = await getStudentSelectedTrack(userId);
    return sendSuccess(res, 200, 'Student track enrollment retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/student/track (or PUT)
 * Enroll or switch learning track for authenticated student.
 */
export const selectTrack = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const trackSlug = req.body?.trackSlug || req.body?.slug;

    if (!trackSlug) {
      return res.status(400).json({
        success: false,
        message: 'trackSlug is required in request body',
        errors: { trackSlug: 'Please provide a valid track slug (e.g. web-development)' },
      });
    }

    const result = await selectStudentTrack(userId, trackSlug);
    return sendSuccess(
      res,
      200,
      `Successfully enrolled in ${result.selectedTrack.name} Track`,
      result
    );
  } catch (error) {
    next(error);
  }
};
