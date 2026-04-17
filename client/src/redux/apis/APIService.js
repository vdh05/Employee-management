import axios from 'axios';
import { TokenManager } from '../../utils/tokenManager';

export const apiService = axios.create({
  baseURL: import.meta.env.VITE_EMPLOYEE_API || 'https://employee-management3-ztml.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to ensure credentials are sent with every request
apiService.interceptors.request.use((config) => {
  config.withCredentials = true;
  
  // Try to get token from localStorage and add to Authorization header
  const emToken = TokenManager.getEmployeeToken();
  const hrToken = TokenManager.getHRToken();
  
  if (emToken) {
    config.headers.Authorization = `Bearer ${emToken}`;
  } else if (hrToken) {
    config.headers.Authorization = `Bearer ${hrToken}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to log 401 errors
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('[API Error 401] Unauthorized:', error.config?.url, error.response?.data?.message);
      // Clear tokens on 401
      TokenManager.clearAllTokens();
    }
    return Promise.reject(error);
  }
);
