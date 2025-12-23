import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useHabits } from '../contexts/HabitContext';
import { useTheme } from '../contexts/ThemeContext';

const CATEGORIES = [
  { id: 'health', label: 'Santé', icon: 'heart', family: 'MaterialCommunityIcons' },
  { id: 'fitness', label: 'Fitness', icon: 'dumbbell', family: 'MaterialCommunityIcons' },
  { id: 'learning', label: 'Apprentissage', icon: 'book', family: 'MaterialCommunityIcons' },
  { id: 'productivity', label: 'Productivité', icon: 'briefcase', family: 'MaterialCommunityIcons' },
  { id: 'mindfulness', label: 'Bien-être', icon: 'meditation', family: 'MaterialCommunityIcons' },
  { id: 'nutrition', label: 'Nutrition', icon: 'food-apple', family: 'MaterialCommunityIcons' },
  { id: 'sleep', label: 'Sommeil', icon: 'sleep', family: 'MaterialCommunityIcons' },
  { id: 'social', label: 'Social', icon: 'account-group', family: 'MaterialCommunityIcons' },
  { id: 'finance', label: 'Finance', icon: 'cash', family: 'MaterialCommunityIcons' },
  { id: 'creativity', label: 'Créativité', icon: 'palette', family: 'MaterialCommunityIcons' },
  { id: 'hobby', label: 'Loisirs', icon: 'gamepad-variant', family: 'MaterialCommunityIcons' },
  { id: 'family', label: 'Famille', icon: 'home-heart', family: 'MaterialCommunityIcons' },
  { id: 'work', label: 'Travail', icon: 'laptop', family: 'MaterialCommunityIcons' },
  { id: 'environment', label: 'Environnement', icon: 'earth', family: 'MaterialCommunityIcons' },
  { id: 'other', label: 'Autre', icon: 'dots-horizontal', family: 'MaterialCommunityIcons' },
];

const ICONS = [
  { name: 'fitness', family: 'MaterialIcons' },
  { name: 'local-library', family: 'MaterialIcons' },
  { name: 'water-drop', family: 'MaterialIcons' },
  { name: 'self-improvement', family: 'MaterialIcons' },
  { name: 'restaurant', family: 'MaterialIcons' },
  { name: 'bedtime', family: 'MaterialIcons' },
  { name: 'run-circle', family: 'MaterialCommunityIcons' },
  { name: 'book-open-page-variant', family: 'MaterialCommunityIcons' },
  { name: 'meditation', family: 'MaterialCommunityIcons' },
  { name: 'dumbbell', family: 'MaterialCommunityIcons' },
  { name: 'brain', family: 'MaterialCommunityIcons' },
  { name: 'heart-pulse', family: 'MaterialCommunityIcons' },
  { name: 'leaf', family: 'MaterialCommunityIcons' },
  { name: 'coffee', family: 'MaterialCommunityIcons' },
  { name: 'music', family: 'MaterialCommunityIcons' },
  { name: 'palette', family: 'MaterialCommunityIcons' },
  { name: 'briefcase', family: 'MaterialCommunityIcons' },
  { name: 'camera', family: 'MaterialCommunityIcons' },
  { name: 'walking', family: 'FontAwesome5' },
  { name: 'bicycle', family: 'Ionicons' },
  { name: 'moon', family: 'Ionicons' },
  { name: 'sunny', family: 'Ionicons' },
  { name: 'water', family: 'Ionicons' },
  { name: 'flame', family: 'Ionicons' },
];

const COLORS = [
  '#1E3A8A', // bleu foncé
  '#991B1B', // rouge foncé
  '#064E3B', // vert foncé
  '#92400E', // orange foncé
  '#581C87', // violet foncé
  '#134E4A', // turquoise foncé
  '#7C2D12', // marron orangé
  '#1E40AF', // bleu royal
  '#9F1239', // rose foncé
  '#164E63', // cyan foncé
  '#78350F', // brun foncé
  '#4C1D95', // indigo foncé
  '#831843', // magenta foncé
  '#065F46', // émeraude foncé
  '#713F12', // ambre foncé
  '#3B0764', // pourpre foncé
  '#0C4A6E', // bleu ciel foncé
  '#881337', // cramoisi foncé
  '#14532D', // vert forêt foncé
  '#7E22CE', // violet profond
  '#1E293B', // ardoise foncé
];

const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Facile', color: '#10B981' },
  { id: 'medium', label: 'Moyen', color: '#F59E0B' },
  { id: 'hard', label: 'Difficile', color: '#EF4444' },
];

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

const AddHabitScreen = ({ navigation, route }) => {
  const { addHabit, updateHabit, habits } = useHabits();
  const { theme } = useTheme();
  
  // Mode édition
  const editMode = route?.params?.editMode || false;
  const habitId = route?.params?.habitId;
  const existingHabit = editMode && habitId ? habits.find(h => h.id === habitId) : null;
  
  const [category, setCategory] = useState(existingHabit?.category || 'health');
  const [name, setName] = useState(existingHabit?.name || '');
  const [description, setDescription] = useState(existingHabit?.description || '');
  const [selectedIcon, setSelectedIcon] = useState(existingHabit?.icon || ICONS[0]);
  const [selectedColor, setSelectedColor] = useState(existingHabit?.color || COLORS[0]);
  const [difficulty, setDifficulty] = useState(existingHabit?.difficulty || 'medium');
  const [frequency, setFrequency] = useState(existingHabit?.frequency || 'daily');
  const [targetDays, setTargetDays] = useState(existingHabit?.targetDays?.toString() || '7');
  const [reminderEnabled, setReminderEnabled] = useState(existingHabit?.reminderEnabled || false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un nom pour l\'habitude');
      return;
    }

    const habitData = {
      category,
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
      color: selectedColor,
      difficulty,
      frequency,
      targetDays: parseInt(targetDays) || 7,
      reminderEnabled,
    };

    if (editMode && habitId) {
      await updateHabit(habitId, habitData);
    } else {
      await addHabit(habitData);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.cancelButton, { color: theme.textSecondary }]}>Annuler</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>{editMode ? 'Modifier l\'habitude' : 'Nouvelle habitude'}</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={[styles.saveButton, { color: theme.primary }]}>Sauver</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Catégorie</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    { backgroundColor: theme.cardBackground },
                    category === cat.id && styles.categoryButtonSelected,
                    category === cat.id && { backgroundColor: selectedColor }
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <IconComponent 
                    family={cat.family}
                    name={cat.icon}
                    size={20}
                    color={category === cat.id ? '#FFF' : theme.textSecondary}
                  />
                  <Text style={[
                    styles.categoryButtonText,
                    { color: theme.textSecondary },
                    category === cat.id && styles.categoryButtonTextActive
                  ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Nom de l'habitude</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Méditer 10 minutes"
            placeholderTextColor={theme.textTertiary}
            autoFocus
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Description (optionnel)</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Ajoutez des détails sur votre habitude..."
            placeholderTextColor={theme.textTertiary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Icône</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.iconGrid}>
              {ICONS.map((icon) => (
                <TouchableOpacity
                  key={`${icon.family}-${icon.name}`}
                  style={[
                    styles.iconButton,
                    { backgroundColor: theme.cardBackground, borderColor: theme.border },
                    selectedIcon === icon && styles.iconButtonSelected,
                    selectedIcon === icon && { borderColor: selectedColor }
                  ]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <IconComponent 
                    family={icon.family}
                    name={icon.name}
                    size={24}
                    color={selectedIcon === icon ? selectedColor : theme.textSecondary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Couleur</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                    <MaterialIcons name="check" size={24} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Difficulté</Text>
          <View style={styles.difficultyButtons}>
            {DIFFICULTY_LEVELS.map(level => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.difficultyButton,
                  { backgroundColor: theme.cardBackground, borderColor: theme.border },
                  difficulty === level.id && styles.difficultyButtonActive,
                  difficulty === level.id && { backgroundColor: level.color, borderColor: level.color }
                ]}
                onPress={() => setDifficulty(level.id)}
              >
                <Text style={[
                  styles.difficultyButtonText,
                  { color: theme.text },
                  difficulty === level.id && styles.difficultyButtonTextActive
                ]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Fréquence</Text>
          <View style={styles.frequencyButtons}>
            <TouchableOpacity
              style={[
                styles.frequencyButton,
                { backgroundColor: theme.cardBackground, borderColor: theme.border },
                frequency === 'daily' && styles.frequencyButtonActive,
                frequency === 'daily' && { backgroundColor: selectedColor }
              ]}
              onPress={() => setFrequency('daily')}
            >
              <Text style={[
                styles.frequencyButtonText,
                { color: theme.text },
                frequency === 'daily' && styles.frequencyButtonTextActive
              ]}>
                Quotidien
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.frequencyButton,
                { backgroundColor: theme.cardBackground, borderColor: theme.border },
                frequency === 'weekly' && styles.frequencyButtonActive,
                frequency === 'weekly' && { backgroundColor: selectedColor }
              ]}
              onPress={() => setFrequency('weekly')}
            >
              <Text style={[
                styles.frequencyButtonText,
                { color: theme.text },
                frequency === 'weekly' && styles.frequencyButtonTextActive
              ]}>
                Hebdomadaire
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Objectif (jours)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
            value={targetDays}
            onChangeText={setTargetDays}
            placeholder="Ex: 30"
            placeholderTextColor={theme.textTertiary}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <View style={[styles.reminderRow, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
            <View>
              <Text style={[styles.label, { color: theme.text }]}>Rappels</Text>
              <Text style={[styles.reminderSubtext, { color: theme.textSecondary }]}>Recevoir une notification quotidienne</Text>
            </View>
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
              trackColor={{ false: theme.border, true: selectedColor + '60' }}
              thumbColor={reminderEnabled ? selectedColor : '#FFF'}
            />
          </View>
        </View>

        <View style={styles.previewSection}>
          <Text style={[styles.label, { color: theme.text }]}>Aperçu</Text>
          <View style={[styles.previewCard, { backgroundColor: theme.cardBackground, borderLeftColor: selectedColor }]}>
            <View style={[styles.previewIconContainer, { backgroundColor: selectedColor + '20' }]}>
              <IconComponent 
                family={selectedIcon.family}
                name={selectedIcon.name}
                size={24}
                color={selectedColor}
              />
            </View>
            <View style={styles.previewInfo}>
              <Text style={[styles.previewName, { color: theme.text }]}>{name || 'Nom de l\'habitude'}</Text>
              <Text style={[styles.previewCategory, { color: theme.textSecondary }]}>
                {CATEGORIES.find(c => c.id === category)?.label}
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
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  categoryButtonSelected: {
    borderColor: 'transparent',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#FFF',
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
  textArea: {
    minHeight: 80,
    paddingTop: 16,
  },
  iconGrid: {
    flexDirection: 'row',
    gap: 10,
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
  colorGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  colorButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
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
  difficultyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  difficultyButtonActive: {
    borderColor: 'transparent',
  },
  difficultyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  difficultyButtonTextActive: {
    color: '#FFF',
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
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  reminderSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  previewSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  previewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  previewIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewInfo: {
    flex: 1,
  },
  previewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  previewCategory: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default AddHabitScreen;
