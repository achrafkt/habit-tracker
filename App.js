import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { HabitProvider } from './src/contexts/HabitContext';
import AppNavigator from './src/navigation/AppNavigator';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';

// Configurer dayjs en français
dayjs.locale('fr');

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <HabitProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </HabitProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
