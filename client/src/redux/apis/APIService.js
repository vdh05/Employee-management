import axios from 'axios';

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
    }
    return Promise.reject(error);
  }
);
