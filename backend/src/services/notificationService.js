import Notification, { NOTIFICATION_TYPES } from '../models/Notification.js';
import User from '../models/User.js';
import { logger } from '../utils/logger.js';

/**
 * Creates a notification for a specific user.
 */
export const createNotification = async ({ userId, type, title, message, data = {} }) => {
  if (!NOTIFICATION_TYPES.includes(type)) {
    logger.warn(`[NotificationService] Invalid notification type '${type}' provided. Unsupported type.`);
    throw new Error(`Invalid notification type '${type}'`);
  }

  const notification = await Notification.create({
    user: userId,
    type,
    title,
    message,
    data,
    isRead: false,
    readAt: null
  });
  logger.info(`[NotificationService] Created '${type}' notification for user ${userId}: "${title}"`);
  return notification;
};

/**
 * Gets paginated notifications for a student.
 */
export const getNotificationsForStudentService = async (userId, options = {}) => {
  const page = Math.max(1, parseInt(options.page, 10) || 1);
  const limit = Math.max(1, Math.min(100, parseInt(options.limit, 10) || 10));
  const skip = (page - 1) * limit;

  const query = { user: userId };
  if (options.isRead !== undefined && options.isRead !== null && options.isRead !== '') {
    query.isRead = options.isRead === 'true' || options.isRead === true;
  }

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Notification.countDocuments(query),
    Notification.countDocuments({ user: userId, isRead: false })
  ]);

  return {
    notifications,
    unreadCount,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1
    }
  };
};

/**
 * Gets total unread notification count for a student.
 */
export const getUnreadNotificationCountService = async (userId) => {
  const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });
  return { unreadCount };
};

/**
 * Marks a single notification as read.
 */
export const markNotificationAsReadService = async (userId, notificationId) => {
  const notification = await Notification.findOne({ _id: notificationId, user: userId });
  if (!notification) {
    const error = new Error('Notification not found or access denied');
    error.statusCode = 404;
    throw error;
  }

  if (!notification.isRead) {
    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();
  }

  return notification;
};

/**
 * Marks all notifications as read for a student.
 */
export const markAllNotificationsAsReadService = async (userId) => {
  const now = new Date();
  const result = await Notification.updateMany(
    { user: userId, isRead: false },
    { $set: { isRead: true, readAt: now } }
  );

  return {
    modifiedCount: result.modifiedCount || result.nModified || 0,
    markedAt: now
  };
};

/**
 * Deletes a notification for a student.
 */
export const deleteNotificationService = async (userId, notificationId) => {
  const notification = await Notification.findOneAndDelete({ _id: notificationId, user: userId });
  if (!notification) {
    const error = new Error('Notification not found or access denied');
    error.statusCode = 404;
    throw error;
  }
  return { id: notificationId, deleted: true };
};

/**
 * Admin Service: Sends an announcement notification to a targeted student or all students.
 */
export const sendAdminAnnouncementService = async ({ adminId, title, message, targetUser, data = {} }) => {
  if (targetUser) {
    const student = await User.findById(targetUser);
    if (!student) {
      const error = new Error('Target student not found');
      error.statusCode = 404;
      throw error;
    }

    const notification = await createNotification({
      userId: student._id,
      type: 'admin_announcement',
      title,
      message,
      data: { ...data, sentByAdmin: adminId }
    });

    return { recipientCount: 1, notifications: [notification] };
  }

  // Broadcast to all students
  const students = await User.find({ role: 'student' }).select('_id');
  const createdNotifications = [];

  for (const student of students) {
    const notification = await createNotification({
      userId: student._id,
      type: 'admin_announcement',
      title,
      message,
      data: { ...data, sentByAdmin: adminId }
    });
    createdNotifications.push(notification);
  }

  return {
    recipientCount: createdNotifications.length,
    notifications: createdNotifications
  };
};
