export const APP_CONFIG = {
  name: 'CodeForge',
  tagline: 'Online Programming Learning and Practice Platform',
  version: '1.0.0',
};

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeoutMs: 10000,
};

export const ENDPOINTS = {
  health: '/health',
};
