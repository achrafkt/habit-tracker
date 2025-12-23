import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import habitService from '../services/habitService';
import { useAuth } from './AuthContext';

const HabitContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Load habits - works both online and offline
  useEffect(() => {
    loadHabits();
  }, [isAuthenticated]);

  const loadHabits = async () => {
    try {
      setLoading(true);
      if (isAuthenticated) {
        // Try to load from API if authenticated
        try {
          const data = await habitService.getHabits();
          setHabits(data);
          // Cache data locally
          await AsyncStorage.setItem('habits', JSON.stringify(data));
        } catch (error) {
          console.error('Error loading habits from API:', error);
          // Fallback to local storage
          const localData = await AsyncStorage.getItem('habits');
          if (localData) {
            setHabits(JSON.parse(localData));
          }
        }
      } else {
        // Load from local storage when offline
        const localData = await AsyncStorage.getItem('habits');
        if (localData) {
          setHabits(JSON.parse(localData));
        } else {
          setHabits([]);
        }
      }
    } catch (error) {
      console.error('Error loading habits:', error);
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async (habit) => {
    try {
      let newHabit;
      if (isAuthenticated) {
        // Try to create on server
        try {
          newHabit = await habitService.createHabit({
            name: habit.name,
            category: habit.category,
            description: habit.description,
            icon: habit.icon || { name: 'fitness', family: 'MaterialIcons' },
            color: habit.color || '#1E3A8A',
            difficulty: habit.difficulty,
            frequency: habit.frequency || 'daily',
            target_days: habit.targetDays || 7,
            notification_enabled: habit.reminderEnabled || false,
            notification_time: habit.notificationTime || '09:00',
          });
        } catch (error) {
          console.error('Error adding habit to API:', error);
          // Fallback to local creation
          newHabit = {
            id: `local-${Date.now()}`,
            ...habit,
            completions: [],
            current_streak: 0,
            longest_streak: 0,
            created_at: new Date().toISOString(),
          };
        }
      } else {
        // Create locally
        newHabit = {
          id: `local-${Date.now()}`,
          ...habit,
          completions: [],
          current_streak: 0,
          longest_streak: 0,
          created_at: new Date().toISOString(),
        };
      }
      const updatedHabits = [...habits, newHabit];
      setHabits(updatedHabits);
      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      return newHabit;
    } catch (error) {
      console.error('Error adding habit:', error);
      throw error;
    }
  };

  const updateHabit = async (id, updates) => {
    try {
      let updated;
      if (isAuthenticated && !id.toString().startsWith('local-')) {
        try {
          updated = await habitService.updateHabit(id, updates);
        } catch (error) {
          console.error('Error updating habit on API:', error);
          // Fallback to local update
          const habit = habits.find(h => h.id === id);
          updated = { ...habit, ...updates };
        }
      } else {
        // Local update
        const habit = habits.find(h => h.id === id);
        updated = { ...habit, ...updates };
      }
      const updatedHabits = habits.map(habit => 
        habit.id === id ? updated : habit
      );
      setHabits(updatedHabits);
      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      return updated;
    } catch (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
  };

  const deleteHabit = async (id) => {
    try {
      if (isAuthenticated && !id.toString().startsWith('local-')) {
        try {
          await habitService.deleteHabit(id);
        } catch (error) {
          console.error('Error deleting habit from API:', error);
        }
      }
      const updatedHabits = habits.filter(habit => habit.id !== id);
      setHabits(updatedHabits);
      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const habit = habits.find(h => h.id === id);
      if (!habit) return;

      let updated;
      if (isAuthenticated && !id.toString().startsWith('local-')) {
        try {
          const apiResponse = await habitService.toggleCompletion(id);
          // API returns completion info, not full habit - need to update locally
          const today = dayjs().format('YYYY-MM-DD');
          
          if (apiResponse.completed) {
            // Added completion
            updated = {
              ...habit,
              completions: [
                ...(habit.completions || []),
                apiResponse.completion || { completed_at: today }
              ],
            };
          } else {
            // Removed completion
            updated = {
              ...habit,
              completions: (habit.completions || []).filter(c => 
                dayjs(c.completed_at).format('YYYY-MM-DD') !== today
              ),
            };
          }
        } catch (error) {
          console.error('Error toggling completion on API:', error);
          // Fallback to local toggle
          const today = dayjs().format('YYYY-MM-DD');
          const isCompleted = habit.completions?.some(c => 
            dayjs(c.completed_at).format('YYYY-MM-DD') === today
          );
          
          if (isCompleted) {
            updated = {
              ...habit,
              completions: habit.completions.filter(c => 
                dayjs(c.completed_at).format('YYYY-MM-DD') !== today
              ),
            };
          } else {
            updated = {
              ...habit,
              completions: [
                ...(habit.completions || []),
                { completed_at: new Date().toISOString() }
              ],
            };
          }
        }
      } else {
        // Local toggle
        const today = dayjs().format('YYYY-MM-DD');
        const isCompleted = habit.completions?.some(c => 
          dayjs(c.completed_at || c).format('YYYY-MM-DD') === today
        );
        
        if (isCompleted) {
          updated = {
            ...habit,
            completions: habit.completions.filter(c => 
              dayjs(c.completed_at || c).format('YYYY-MM-DD') !== today
            ),
          };
        } else {
          updated = {
            ...habit,
            completions: [
              ...(habit.completions || []),
              { completed_at: new Date().toISOString() }
            ],
          };
        }
      }

      const updatedHabits = habits.map(h => 
        h.id === id ? updated : h
      );
      setHabits(updatedHabits);
      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      return updated;
    } catch (error) {
      console.error('Error toggling completion:', error);
      throw error;
    }
  };

  const isCompletedToday = (habit) => {
    const today = dayjs().format('YYYY-MM-DD');
    return habit.completions?.some(c => 
      dayjs(c.completed_at).format('YYYY-MM-DD') === today
    ) || false;
  };

  const getCurrentStreak = (habit) => {
    if (!habit || !habit.completions || habit.completions.length === 0) return 0;
    
    // Calculate streak based on consecutive days
    const sortedCompletions = [...habit.completions].sort((a, b) => 
      dayjs(b.completed_at || b).diff(dayjs(a.completed_at || a))
    );
    
    let streak = 0;
    let checkDate = dayjs();
    
    for (const completion of sortedCompletions) {
      const completionDate = dayjs(completion.completed_at || completion);
      const diffDays = checkDate.diff(completionDate, 'day');
      
      if (diffDays === 0 || diffDays === 1) {
        streak++;
        checkDate = completionDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getLongestStreak = (habit) => {
    if (!habit.longest_streak) return 0;
    return habit.longest_streak;
  };

  const getCompletionRate = (habit, days = 30) => {
    if (!habit.completions) return 0;
    
    const startDate = dayjs().subtract(days, 'day');
    const completionsInPeriod = habit.completions.filter(c => 
      dayjs(c.completed_at).isAfter(startDate)
    ).length;
    
    return Math.round((completionsInPeriod / days) * 100);
  };

  const value = {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    isCompletedToday,
    getCurrentStreak,
    getLongestStreak,
    getCompletionRate,
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};
