import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import { ensureDefaultLanguages, DEFAULT_LANGUAGES } from '../services/languageService.js';
import { logger } from '../utils/logger.js';

const seed = async () => {
  try {
    logger.info('Initializing CodeForge official programming languages...');
    await connectDB();
    await ensureDefaultLanguages();
    logger.info(`Successfully synchronized ${DEFAULT_LANGUAGES.length} official languages: ${DEFAULT_LANGUAGES.map(l => l.name).join(', ')}`);
  } catch (error) {
    logger.error('Failed to seed languages:', error.message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

seed();
