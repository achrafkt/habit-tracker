import api from '../config/api';

const habitService = {
  // Get all habits
  getHabits: async () => {
    try {
      const response = await api.get('/habits');
      return response.data.data || response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single habit
  getHabit: async (id) => {
    try {
      const response = await api.get(`/habits/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new habit
  createHabit: async (habitData) => {
    try {
      const response = await api.post('/habits', habitData);
      return response.data.data || response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update habit
  updateHabit: async (id, habitData) => {
    try {
      const response = await api.put(`/habits/${id}`, habitData);
      return response.data.data || response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete habit
  deleteHabit: async (id) => {
    try {
      const response = await api.delete(`/habits/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Toggle habit completion
  toggleCompletion: async (id, date = null) => {
    try {
      const response = await api.post(`/habits/${id}/toggle`, {
        completed_at: date || new Date().toISOString().split('T')[0],
      });
      return response.data.data || response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/stats/dashboard');
      return response.data.data || response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default habitService;
