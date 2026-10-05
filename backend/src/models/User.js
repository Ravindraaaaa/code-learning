import mongoose from 'mongoose';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, 'Please provide a valid email address'],
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      minlength: [20, 'Password hash must be valid'],
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'admin'],
        message: '{VALUE} is not a valid role. Allowed roles: student, admin',
      },
      default: 'student',
      index: true,
    },
    roadmap: {
      enrolled: { type: Boolean, default: false },
      title: { type: String, default: null },
      trackId: { type: String, default: null },
      currentModule: { type: String, default: null },
      completedModules: { type: Number, default: 0 },
      totalModules: { type: Number, default: 0 },
    },
    learningProgress: {
      topicsCompleted: { type: Number, default: 0 },
      totalTopics: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
      lastCompletedTopic: { type: String, default: null },
    },
    streak: {
      currentStreak: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: null },
      freezeDaysAvailable: { type: Number, default: 0 },
    },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: String, default: 'Unrated' },
        score: { type: Number, default: 0 },
        problemsSolved: { type: Number, default: 0 },
      },
    ],
    testPerformance: {
      testsTaken: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 },
      highestScore: { type: Number, default: 0 },
      lastTestDate: { type: Date, default: null },
      recentTests: [
        {
          testId: { type: String, required: true },
          title: { type: String, required: true },
          score: { type: Number, required: true },
          maxScore: { type: Number, required: true },
          date: { type: Date, default: Date.now },
        },
      ],
    },
    recentActivity: [
      {
        activityType: {
          type: String,
          enum: ['problem_solved', 'test_submitted', 'lesson_completed', 'contest_joined'],
          required: true,
        },
        title: { type: String, required: true },
        detail: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    selectedLanguage: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Exclude passwordHash from JSON serialization to prevent accidental leakage
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  return userObject;
};

export const User = mongoose.model('User', userSchema);
export default User;
