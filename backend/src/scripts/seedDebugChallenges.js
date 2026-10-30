import { connectDB, disconnectDB } from '../config/db.js';
import DebugChallenge from '../models/DebugChallenge.js';
import { DEFAULT_DEBUG_CHALLENGES } from '../data/defaultDebugChallenges.js';
import { logger } from '../utils/logger.js';

const seedDebugChallenges = async () => {
  try {
    logger.info('Connecting to MongoDB to seed Debug Challenges...');
    await connectDB();

    for (const challenge of DEFAULT_DEBUG_CHALLENGES) {
      await DebugChallenge.findOneAndUpdate(
        { _id: challenge._id },
        challenge,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    logger.info(`Successfully seeded ${DEFAULT_DEBUG_CHALLENGES.length} Debug Challenges.`);
  } catch (err) {
    logger.error('Failed to seed Debug Challenges:', err.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seedDebugChallenges();

