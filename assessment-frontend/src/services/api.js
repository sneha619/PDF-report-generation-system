import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password });
  },
  signup: (userData) => {
    return api.post('/auth/signup', userData);
  },
  getCurrentUser: () => {
    return api.get('/auth/me');
  },
};

// Report API calls
export const reportAPI = {
  generateReport: (sessionId, assessmentType) => {
    return api.post('/report/generate-report', {
      session_id: sessionId,
      assessment_type: assessmentType,
    });
  },
  getAssessmentTypes: () => {
    return api.get('/report/assessment-types');
  },
  getFieldMappings: (assessmentType) => {
    return api.get(`/report/field-mappings/${assessmentType}`);
  },
};

export default api;