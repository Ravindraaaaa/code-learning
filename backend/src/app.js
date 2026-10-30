import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { mongoSanitizer } from './middleware/mongoSanitizer.js';
import {
  globalRateLimiter,
  authRateLimiter,
  codeExecutionRateLimiter,
  aiRateLimiter
} from './middleware/rateLimiter.js';

const app = express();

// 1. Helmet HTTP Response Header Hardening
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://emacs.piston.rs', 'https://generativelanguage.googleapis.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
    frameguard: { action: 'deny' },
    xssFilter: true,
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// 2. Strict CORS Configuration
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server tests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else if (config.env === 'development' && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        // In local development, accept any port on localhost or 127.0.0.1
        callback(null, true);
      } else {
        callback(new Error(`CORS Policy Violation: Origin '${origin}' is not authorized.`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

// 3. Body Parsers with Size Limits to Prevent Payload Flooding
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. MongoDB Operator Injection Protection
app.use(mongoSanitizer);

// 5. Rate Limiting Rules
if (config.env !== 'test') {
  app.use('/api/v1', globalRateLimiter);
  app.use('/api/v1/auth/login', authRateLimiter);
  app.use('/api/v1/auth/register', authRateLimiter);
  app.use('/api/v1/auth/admin/login', authRateLimiter);
  app.use('/api/v1/code', codeExecutionRateLimiter);
  app.use('/api/v1/debug-arena', codeExecutionRateLimiter);
  app.use('/api/v1/competitions', codeExecutionRateLimiter);
  app.use('/api/v1/ai', aiRateLimiter);
}

app.get('/', (req, res) => {
  res.json({
    name: 'CodeForge API',
    status: 'running',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

app.use('/api/v1', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
