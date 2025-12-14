import api from '../config/api';
import * as SecureStore from 'expo-secure-store';

const authService = {
  // Register a new user
  register: async (name, email, password) => {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: password,
      });
      
      if (response.data.token) {
        await SecureStore.setItemAsync('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      
      if (response.data.token) {
        await SecureStore.setItemAsync('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('authToken');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async () => {
    const token = await SecureStore.getItemAsync('authToken');
    return !!token;
  },

  // Get stored token
  getToken: async () => {
    return await SecureStore.getItemAsync('authToken');
  },
};

export default authService;
