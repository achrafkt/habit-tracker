import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabits } from '../contexts/HabitContext';
import dayjs from 'dayjs';

const HomeScreen = ({ navigation }) => {
  const { habits, toggleCompletion, isCompletedToday, getCurrentStreak } = useHabits();

  const renderHabitItem = ({ item }) => {
    const completed = isCompletedToday(item);
    const streak = getCurrentStreak(item);

    return (
      <TouchableOpacity
        style={styles.habitCard}
        onPress={() => navigation.navigate('Details', { habitId: item.id })}
      >
        <View style={styles.habitLeft}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { borderColor: item.color },
              completed && { backgroundColor: item.color }
            ]}
            onPress={() => toggleCompletion(item.id)}
          >
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          
          <View style={styles.habitInfo}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitIcon}>{item.icon}</Text>
              <Text style={styles.habitName}>{item.name}</Text>
            </View>
            <Text style={styles.habitFrequency}>
              {item.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'}
            </Text>
          </View>
        </View>

        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour!</Text>
          <Text style={styles.date}>{dayjs().format('DD MMMM YYYY')}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {habits.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>Aucune habitude</Text>
          <Text style={styles.emptyText}>
            Commencez par ajouter votre première habitude !
          </Text>
        </View>
      ) : (
        <FlatList
          data={habits}
          renderItem={renderHabitItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddHabit')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsIcon: {
    fontSize: 24,
  },
  listContent: {
    padding: 20,
    paddingTop: 10,
  },
  habitCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitInfo: {
    flex: 1,
  },
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  habitFrequency: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  streakText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
  },
});

export default HomeScreen;
