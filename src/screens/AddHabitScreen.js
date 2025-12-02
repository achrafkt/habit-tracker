import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabits } from '../contexts/HabitContext';

const ICONS = ['⭐', '💪', '📚', '🏃', '💧', '🧘', '🎯', '✍️', '🎨', '🎵', '🌱', '💼'];
const COLORS = [
  '#4A90E2', '#E94B3C', '#50C878', '#FFB347', 
  '#9B59B6', '#1ABC9C', '#E67E22', '#3498DB',
  '#E91E63', '#00BCD4', '#FF5722', '#795548'
];

const AddHabitScreen = ({ navigation }) => {
  const { addHabit } = useHabits();
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('⭐');
  const [selectedColor, setSelectedColor] = useState('#4A90E2');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom pour l\'habitude');
      return;
    }

    addHabit({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor,
      frequency,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Annuler</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nouvelle habitude</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveButton}>Sauver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Nom de l'habitude</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Méditer 10 minutes"
            placeholderTextColor="#999"
            autoFocus
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Icône</Text>
          <View style={styles.iconGrid}>
            {ICONS.map(icon => (
              <TouchableOpacity
                key={icon}
                style={[
                  styles.iconButton,
                  selectedIcon === icon && styles.iconButtonSelected,
                  selectedIcon === icon && { borderColor: selectedColor }
                ]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Text style={styles.iconText}>{icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Couleur</Text>
          <View style={styles.colorGrid}>
            {COLORS.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorButtonSelected
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Text style={styles.colorCheckmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Fréquence</Text>
          <View style={styles.frequencyButtons}>
            <TouchableOpacity
              style={[
                styles.frequencyButton,
                frequency === 'daily' && styles.frequencyButtonActive,
                frequency === 'daily' && { backgroundColor: selectedColor }
              ]}
              onPress={() => setFrequency('daily')}
            >
              <Text style={[
                styles.frequencyButtonText,
                frequency === 'daily' && styles.frequencyButtonTextActive
              ]}>
                Quotidien
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.frequencyButton,
                frequency === 'weekly' && styles.frequencyButtonActive,
                frequency === 'weekly' && { backgroundColor: selectedColor }
              ]}
              onPress={() => setFrequency('weekly')}
            >
              <Text style={[
                styles.frequencyButtonText,
                frequency === 'weekly' && styles.frequencyButtonTextActive
              ]}>
                Hebdomadaire
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.previewSection}>
          <Text style={styles.label}>Aperçu</Text>
          <View style={[styles.previewCard, { borderLeftColor: selectedColor }]}>
            <Text style={styles.previewIcon}>{selectedIcon}</Text>
            <Text style={styles.previewName}>{name || 'Nom de l\'habitude'}</Text>
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  saveButton: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconButtonSelected: {
    borderWidth: 2.5,
  },
  iconText: {
    fontSize: 28,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButtonSelected: {
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  colorCheckmark: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  frequencyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  frequencyButtonActive: {
    borderColor: 'transparent',
  },
  frequencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  frequencyButtonTextActive: {
    color: '#FFF',
  },
  previewSection: {
    marginTop: 20,
  },
  previewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  previewIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  previewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
});

export default AddHabitScreen;
