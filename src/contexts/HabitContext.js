import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

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

  // Charger les habitudes au démarrage
  useEffect(() => {
    loadHabits();
  }, []);

  // Sauvegarder les habitudes à chaque modification
  useEffect(() => {
    if (!loading) {
      saveHabits();
    }
  }, [habits]);

  const loadHabits = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('habits');
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des habitudes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(habits));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des habitudes:', error);
    }
  };

  const addHabit = (habit) => {
    const newHabit = {
      id: Date.now().toString(),
      name: habit.name,
      icon: habit.icon || '⭐',
      color: habit.color || '#4A90E2',
      frequency: habit.frequency || 'daily', // 'daily' ou 'weekly'
      completions: [], // Tableau de dates de complétion
      createdAt: dayjs().format('YYYY-MM-DD'),
      notificationEnabled: habit.notificationEnabled || false,
      notificationTime: habit.notificationTime || '09:00',
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id, updates) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleCompletion = (id) => {
    const today = dayjs().format('YYYY-MM-DD');
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completions = [...habit.completions];
        const index = completions.indexOf(today);
        
        if (index > -1) {
          // Déjà complété aujourd'hui, retirer
          completions.splice(index, 1);
        } else {
          // Pas encore complété, ajouter
          completions.push(today);
        }
        
        return { ...habit, completions };
      }
      return habit;
    }));
  };

  const isCompletedToday = (habit) => {
    const today = dayjs().format('YYYY-MM-DD');
    return habit.completions.includes(today);
  };

  const getCurrentStreak = (habit) => {
    if (habit.completions.length === 0) return 0;

    const sortedCompletions = [...habit.completions].sort().reverse();
    let streak = 0;
    let currentDate = dayjs();

    // Vérifier si complété aujourd'hui ou hier
    const today = currentDate.format('YYYY-MM-DD');
    const yesterday = currentDate.subtract(1, 'day').format('YYYY-MM-DD');
    
    if (sortedCompletions[0] !== today && sortedCompletions[0] !== yesterday) {
      return 0;
    }

    // Calculer le streak
    for (let i = 0; i < sortedCompletions.length; i++) {
      const expectedDate = currentDate.subtract(i, 'day').format('YYYY-MM-DD');
      if (sortedCompletions[i] === expectedDate) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getLongestStreak = (habit) => {
    if (habit.completions.length === 0) return 0;

    const sortedCompletions = [...habit.completions].sort();
    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedCompletions.length; i++) {
      const prevDate = dayjs(sortedCompletions[i - 1]);
      const currDate = dayjs(sortedCompletions[i]);
      const daysDiff = currDate.diff(prevDate, 'day');

      if (daysDiff === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  const getCompletionRate = (habit, days = 30) => {
    const startDate = dayjs().subtract(days, 'day');
    const completionsInPeriod = habit.completions.filter(date => 
      dayjs(date).isAfter(startDate)
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
