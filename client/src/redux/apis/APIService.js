import axios from 'axios';

export const apiService = axios.create({
  baseURL: import.meta.env.VITE_EMPLOYEE_API || 'https://employee-management3-ztml.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
