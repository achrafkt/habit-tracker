import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      if (authenticated) {
        // Token exists, mark as authenticated immediately
        setIsAuthenticated(true);
        
        try {
          const userData = await authService.getCurrentUser();
          // Handle different response formats
          const user = userData.data || userData.user || userData;
          setUser(user);
        } catch (error) {
          // If token is invalid (401), clear it
          console.error('Failed to get user data:', error);
          if (error.response?.status === 401) {
            // Token is invalid
            await authService.logout();
            setIsAuthenticated(false);
            setUser(null);
          } else {
            // Backend unreachable, stay authenticated with token
            console.log('Backend unreachable, working in offline mode - staying authenticated');
            // Keep isAuthenticated as true, but user data will be null
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      // Extract user data from response
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      // Extract user data from response
      const userData = response.user || response.data?.user || response;
      setUser(userData);
      setIsAuthenticated(true);
      
      // Try to fetch full user profile
      try {
        const fullProfile = await authService.getCurrentUser();
        setUser(fullProfile.data || fullProfile);
      } catch (profileError) {
        console.log('Could not fetch full profile, using login data');
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
