import { API_CONFIG } from '../utils/constants.js';

export const request = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('codeforge_token') : null;
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `HTTP error! Status: ${response.status}`);
      error.status = response.status;
      error.errors = data.errors || null;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getHealthStatus = async () => {
  return request('/health');
};

export const registerUser = async ({ name, email, password }) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = async ({ email, password }) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const loginAdmin = async ({ email, password }) => {
  return request('/auth/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getAuthProfile = async (customToken = null) => {
  const headers = customToken ? { Authorization: `Bearer ${customToken}` } : {};
  return request('/auth/me', {
    method: 'GET',
    headers,
  });
};

export const verifyAdminAccess = async (customToken = null) => {
  const headers = customToken ? { Authorization: `Bearer ${customToken}` } : {};
  return request('/auth/admin/verify', {
    method: 'GET',
    headers,
  });
};

export const getStudentDashboard = async () => {
  return request('/student/dashboard', {
    method: 'GET',
  });
};

export const getLanguages = async () => {
  return request('/languages', {
    method: 'GET',
  });
};

export const getStudentLanguage = async () => {
  return request('/student/language', {
    method: 'GET',
  });
};

export const selectStudentLanguage = async (languageSlug) => {
  return request('/student/language', {
    method: 'POST',
    body: JSON.stringify({ languageSlug }),
  });
};

export const getAdminOverview = async () => {
  return request('/admin/overview', {
    method: 'GET',
  });
};

export const getTracks = async () => {
  return request('/tracks', {
    method: 'GET',
  });
};

export const getTrackDetails = async (slug) => {
  return request(`/tracks/${slug}`, {
    method: 'GET',
  });
};

export const getStudentTrack = async () => {
  return request('/student/track', {
    method: 'GET',
  });
};

export const selectStudentTrack = async (trackSlug) => {
  return request('/student/track', {
    method: 'POST',
    body: JSON.stringify({ trackSlug }),
  });
};

export const getBatches = async () => {
  return request('/batches', {
    method: 'GET',
  });
};

export const createBatch = async (batchData) => {
  return request('/batches', {
    method: 'POST',
    body: JSON.stringify(batchData),
  });
};

export const updateBatch = async (id, batchData) => {
  return request(`/batches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(batchData),
  });
};

export const deleteBatch = async (id) => {
  return request(`/batches/${id}`, {
    method: 'DELETE',
  });
};

const api = {
  get: async (endpoint, options = {}) => {
    const data = await request(endpoint, { ...options, method: 'GET' });
    return { data };
  },
  post: async (endpoint, payload, options = {}) => {
    const data = await request(endpoint, { ...options, method: 'POST', body: JSON.stringify(payload) });
    return { data };
  },
  put: async (endpoint, payload, options = {}) => {
    const data = await request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(payload) });
    return { data };
  },
  delete: async (endpoint, options = {}) => {
    const data = await request(endpoint, { ...options, method: 'DELETE' });
    return { data };
  }
};

export default api;




