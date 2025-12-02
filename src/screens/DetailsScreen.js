import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabits } from '../contexts/HabitContext';
import { LineChart } from 'react-native-chart-kit';
import dayjs from 'dayjs';

const DetailsScreen = ({ route, navigation }) => {
  const { habitId } = route.params;
  const { 
    habits, 
    deleteHabit, 
    getCurrentStreak, 
    getLongestStreak,
    getCompletionRate 
  } = useHabits();

  const habit = habits.find(h => h.id === habitId);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Habitude non trouvée</Text>
      </View>
    );
  }

  const currentStreak = getCurrentStreak(habit);
  const longestStreak = getLongestStreak(habit);
  const completionRate = getCompletionRate(habit, 30);

  const handleDelete = () => {
    Alert.alert(
      'Supprimer l\'habitude',
      'Êtes-vous sûr de vouloir supprimer cette habitude ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            deleteHabit(habitId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Générer les données pour le graphique (derniers 7 jours)
  const getLast7DaysData = () => {
    const labels = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day');
      labels.push(date.format('DD/MM'));
      data.push(habit.completions.includes(date.format('YYYY-MM-DD')) ? 1 : 0);
    }
    
    return { labels, data };
  };

  const chartData = getLast7DaysData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.habitHeader, { backgroundColor: habit.color }]}>
          <Text style={styles.habitIcon}>{habit.icon}</Text>
          <Text style={styles.habitName}>{habit.name}</Text>
          <Text style={styles.habitFrequency}>
            {habit.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Série actuelle</Text>
            <Text style={styles.statIcon}>🔥</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Record</Text>
            <Text style={styles.statIcon}>🏆</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completionRate}%</Text>
            <Text style={styles.statLabel}>30 jours</Text>
            <Text style={styles.statIcon}>📊</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progression (7 derniers jours)</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [{
                  data: chartData.data,
                }],
              }}
              width={Dimensions.get('window').width - 60}
              height={200}
              chartConfig={{
                backgroundColor: '#FFF',
                backgroundGradientFrom: '#FFF',
                backgroundGradientTo: '#FFF',
                decimalPlaces: 0,
                color: (opacity = 1) => habit.color,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: habit.color,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date de création</Text>
              <Text style={styles.infoValue}>
                {dayjs(habit.createdAt).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total de complétions</Text>
              <Text style={styles.infoValue}>{habit.completions.length}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dernière complétion</Text>
              <Text style={styles.infoValue}>
                {habit.completions.length > 0
                  ? dayjs(habit.completions[habit.completions.length - 1]).format('DD/MM/YYYY')
                  : 'Jamais'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  backButton: {
    fontSize: 28,
    color: '#1A1A1A',
  },
  deleteButton: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  habitHeader: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  habitIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  habitName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  habitFrequency: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  chart: {
    borderRadius: 16,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default DetailsScreen;
