import app from './app.js';
import { config } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { logger } from './utils/logger.js';

let server;

const startServer = async () => {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      logger.warn(`Database connection deferred: ${dbError.message}. Ensure MongoDB is running.`);
    }

    server = app.listen(config.port, () => {
      logger.info(`CodeForge server running in ${config.env} mode on port ${config.port}`);
      logger.info(`API Base URL: http://localhost:${config.port}/api/v1`);
      logger.info(`Health check: http://localhost:${config.port}/api/v1/health`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

const handleShutdown = async (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDB();
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer();
