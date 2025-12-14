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
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useHabits } from '../contexts/HabitContext';
import dayjs from 'dayjs';

const IconComponent = ({ family, name, size, color }) => {
  switch (family) {
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'FontAwesome5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} />;
    default:
      return <MaterialIcons name={name} size={size} color={color} />;
  }
};

const HomeScreen = ({ navigation }) => {
  const { habits, toggleCompletion, isCompletedToday, getCurrentStreak } = useHabits();

  const renderHabitItem = ({ item }) => {
    const completed = isCompletedToday(item);
    const streak = getCurrentStreak(item);

    const getDifficultyColor = (difficulty) => {
      switch (difficulty) {
        case 'easy': return '#10B981';
        case 'medium': return '#F59E0B';
        case 'hard': return '#EF4444';
        default: return '#6B7280';
      }
    };

    const getDifficultyLabel = (difficulty) => {
      switch (difficulty) {
        case 'easy': return 'Facile';
        case 'medium': return 'Moyen';
        case 'hard': return 'Difficile';
        default: return '';
      }
    };

    return (
      <TouchableOpacity
        style={styles.habitCard}
        onPress={() => navigation.navigate('Details', { habitId: item.id })}
      >
        <View style={styles.habitLeft}>
          {item.icon && (
            <TouchableOpacity
              style={[styles.iconCheckbox, { backgroundColor: completed ? item.color : item.color + '20' }]}
              onPress={() => toggleCompletion(item.id)}
            >
              <IconComponent 
                family={item.icon.family}
                name={item.icon.name}
                size={20}
                color={completed ? '#FFF' : item.color}
              />
              {completed && (
                <View style={styles.checkBadge}>
                  <MaterialIcons name="check-circle" size={14} color="#FFF" />
                </View>
              )}
            </TouchableOpacity>
          )}
          
          <View style={styles.habitInfo}>
            <View style={styles.habitHeader}>
              <View style={styles.habitTitleContainer}>
                <Text style={styles.habitName}>{item.name}</Text>
                {item.category && (
                  <Text style={styles.habitCategory}>{item.category}</Text>
                )}
              </View>
            </View>
            
            {item.description && (
              <Text style={styles.habitDescription} numberOfLines={1}>
                {item.description}
              </Text>
            )}
            
            <View style={styles.habitMeta}>
              <Text style={styles.habitFrequency}>
                {item.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'}
              </Text>
              {item.difficulty && (
                <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}>
                    {getDifficultyLabel(item.difficulty)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {streak > 0 && (
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={18} color="#FF6B35" />
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
          <Ionicons name="settings-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {habits.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={64} color="#CCC" />
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
        <MaterialIcons name="add" size={32} color="#FFF" />
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
  iconCheckbox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  checkBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  habitInfo: {
    flex: 1,
  },
  habitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  habitTitleContainer: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  habitCategory: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  habitDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  habitMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  habitFrequency: {
    fontSize: 12,
    color: '#999',
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
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
});

export default HomeScreen;
