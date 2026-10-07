import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db.js';
import { User } from '../models/index.js';
import { logger } from '../utils/logger.js';

const seedUsers = async () => {
  try {
    logger.info('Connecting to MongoDB to seed default users...');
    await connectDB();

    const adminHash = await bcrypt.hash('Admin@123', 10);
    const studentHash = await bcrypt.hash('Student@123', 10);

    // 1. Upsert Admin
    await User.findOneAndUpdate(
      { email: 'admin@codeforge.dev' },
      {
        name: 'CodeForge Administrator',
        email: 'admin@codeforge.dev',
        passwordHash: adminHash,
        role: 'admin',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    logger.info('Admin account seeded: admin@codeforge.dev / Admin@123');

    // 2. Upsert Student (Zero fake student data)
    await User.findOneAndUpdate(
      { email: 'student@codeforge.dev' },
      {
        name: 'Alex Student',
        email: 'student@codeforge.dev',
        passwordHash: studentHash,
        role: 'student',
        selectedLanguage: null,
        roadmap: null,
        learningProgress: { topicsCompleted: 0, totalTopics: 0, percentage: 0, lastCompletedTopic: null },
        streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: null, freezeDaysAvailable: 0 },
        skills: [],
        testPerformance: { testsTaken: 0, averageScore: 0, highestScore: 0, lastTestDate: null, recentTests: [] },
        recentActivity: [],
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    logger.info('Student account seeded: student@codeforge.dev / Student@123');

    logger.info('User seeding completed successfully.');
  } catch (err) {
    logger.error('Failed to seed users:', err.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seedUsers();
