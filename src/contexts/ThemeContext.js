import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme colors
export const lightTheme = {
  mode: 'light',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  success: '#50C878',
  danger: '#E94B3C',
  warning: '#FFB347',
  border: '#E0E0E0',
  shadow: '#000000',
  cardBackground: '#FFFFFF',
  inputBackground: '#F8F9FA',
  headerBackground: '#F5F7FA',
};

export const darkTheme = {
  mode: 'dark',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textTertiary: '#808080',
  primary: '#5AA5F5',
  primaryDark: '#4A90E2',
  success: '#60D888',
  danger: '#F5554C',
  warning: '#FFC357',
  border: '#333333',
  shadow: '#000000',
  cardBackground: '#1E1E1E',
  inputBackground: '#2A2A2A',
  headerBackground: '#121212',
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('auto'); // 'light', 'dark', 'auto'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeMode(mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const getActiveTheme = () => {
    if (themeMode === 'auto') {
      return systemColorScheme === 'dark' ? darkTheme : lightTheme;
    }
    return themeMode === 'dark' ? darkTheme : lightTheme;
  };

  const toggleTheme = () => {
    const modes = ['light', 'dark', 'auto'];
    const currentIndex = modes.indexOf(themeMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    saveThemePreference(nextMode);
  };

  const setTheme = (mode) => {
    if (['light', 'dark', 'auto'].includes(mode)) {
      saveThemePreference(mode);
    }
  };

  const isDark = getActiveTheme().mode === 'dark';

  const value = {
    theme: getActiveTheme(),
    themeMode,
    isDark,
    toggleTheme,
    setTheme,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
