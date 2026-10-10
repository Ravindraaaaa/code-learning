import mongoose from 'mongoose';

const NOTIFICATION_TYPES = [
  'assessment_result',
  'test_result',
  'competition',
  'purchase_confirmation',
  'admin_announcement',
  'learning_recommendation'
];

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    type: {
      type: String,
      required: true,
      enum: NOTIFICATION_TYPES,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true
    },
    readAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for user notifications query sorted by date
notificationSchema.index({ user: 1, createdAt: -1 });

export { NOTIFICATION_TYPES };
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
