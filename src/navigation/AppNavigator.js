import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        {/* Main App Stack - accessible without authentication */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="AddHabit" 
          component={AddHabitScreen}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* Auth Stack - available from Settings */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
