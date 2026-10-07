import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import { ensureDefaultTracks, DEFAULT_TRACKS } from '../services/trackService.js';
import { logger } from '../utils/logger.js';

const seed = async () => {
  try {
    logger.info('Initializing CodeForge official learning tracks...');
    await connectDB();
    await ensureDefaultTracks();
    logger.info(
      `Successfully synchronized ${DEFAULT_TRACKS.length} official track(s): ${DEFAULT_TRACKS.map((t) => t.name).join(', ')}`
    );
  } catch (error) {
    logger.error('Failed to seed tracks:', error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seed();
