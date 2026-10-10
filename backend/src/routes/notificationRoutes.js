import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import {
  getStudentNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification
} from '../controllers/notificationController.js';

const router = Router();

router.use(requireAuth);

router.get('/', getStudentNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/read-all', markAllNotificationsAsRead);
router.patch('/:id/read', markNotificationAsRead);
router.delete('/:id', deleteNotification);

export default router;
