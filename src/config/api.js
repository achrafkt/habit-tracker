import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Change this to your Laravel backend URL
// For local development on physical device, use your computer's IP address
// For emulator: Android uses 10.0.2.2, iOS uses localhost
const API_BASE_URL = 'http://192.168.137.98:8000/api'; // Use your computer's IP for physical device/Expo Go

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('API Error:', error.message);
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - check if backend is running');
    }
    if (error.message === 'Network Error') {
      console.error('Network Error - check API_BASE_URL and backend server');
    }
    if (error.response?.status === 401) {
      // Token expired or invalid, clear it
      await SecureStore.deleteItemAsync('authToken');
      // You might want to redirect to login here
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
