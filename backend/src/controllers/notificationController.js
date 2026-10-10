import { sendSuccess, sendError } from '../utils/apiResponse.js';
import {
  getNotificationsForStudentService,
  getUnreadNotificationCountService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
  deleteNotificationService,
  sendAdminAnnouncementService
} from '../services/notificationService.js';
import Notification from '../models/Notification.js';

/**
 * Get notifications for logged in student
 */
export const getStudentNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page, limit, isRead } = req.query;
    const result = await getNotificationsForStudentService(userId, { page, limit, isRead });
    return sendSuccess(res, 200, 'Notifications retrieved successfully', result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Get unread notification count
 */
export const getUnreadCount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await getUnreadNotificationCountService(userId);
    return sendSuccess(res, 200, 'Unread notification count retrieved', result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Mark a single notification as read
 */
export const markNotificationAsRead = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const notification = await markNotificationAsReadService(userId, id);
    return sendSuccess(res, 200, 'Notification marked as read', notification);
  } catch (error) {
    return next(error);
  }
};

/**
 * Mark all notifications as read for student
 */
export const markAllNotificationsAsRead = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const result = await markAllNotificationsAsReadService(userId);
    return sendSuccess(res, 200, 'All notifications marked as read', result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const result = await deleteNotificationService(userId, id);
    return sendSuccess(res, 200, 'Notification deleted successfully', result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Admin: Send announcement notification
 */
export const sendAdminAnnouncement = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const { title, message, targetUser, data } = req.body;

    if (!title || !title.trim() || !message || !message.trim()) {
      return sendError(res, 400, 'Title and message are required fields.');
    }

    const result = await sendAdminAnnouncementService({
      adminId,
      title: title.trim(),
      message: message.trim(),
      targetUser: targetUser || null,
      data: data || {}
    });

    return sendSuccess(res, 201, `Announcement sent successfully to ${result.recipientCount} student(s)`, result);
  } catch (error) {
    return next(error);
  }
};

/**
 * Admin: View sent announcements / platform notifications
 */
export const getAdminNotifications = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;
    const { type } = req.query;

    const query = {};
    if (type) {
      query.type = type;
    }

    const [notifications, total] = await Promise.all([
      Notification.find(query)
        .populate('user', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Notification.countDocuments(query)
    ]);

    return sendSuccess(res, 200, 'Platform notifications retrieved for admin', {
      notifications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1
      }
    });
  } catch (error) {
    return next(error);
  }
};
