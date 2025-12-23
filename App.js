import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { HabitProvider } from './src/contexts/HabitContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';

// Configurer dayjs en français
dayjs.locale('fr');

const AppContent = () => {
  const { isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <AppNavigator />
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <HabitProvider>
            <AppContent />
          </HabitProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
