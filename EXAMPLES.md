# 📘 Exemples d'Utilisation - Habit Tracker

Ce fichier contient des exemples de code pour utiliser les différentes fonctionnalités de l'application.

## 🎯 Utilisation du Context

### Importer le Hook

```javascript
import { useHabits } from '../contexts/HabitContext';
```

### Exemple 1 : Ajouter une Habitude

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const AddHabitExample = () => {
  const { addHabit } = useHabits();
  const [name, setName] = useState('');

  const handleAdd = () => {
    addHabit({
      name: name,
      icon: '⭐',
      color: '#4A90E2',
      frequency: 'daily',
    });
    setName('');
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nom de l'habitude"
      />
      <Button title="Ajouter" onPress={handleAdd} />
    </View>
  );
};
```

### Exemple 2 : Afficher la Liste des Habitudes

```javascript
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const HabitListExample = () => {
  const { habits } = useHabits();

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.icon} {item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={habits}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
```

### Exemple 3 : Marquer comme Complété

```javascript
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const ToggleHabitExample = ({ habitId }) => {
  const { habits, toggleCompletion, isCompletedToday } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  const completed = isCompletedToday(habit);

  return (
    <TouchableOpacity onPress={() => toggleCompletion(habitId)}>
      <Text>
        {completed ? '✅' : '⬜'} {habit.name}
      </Text>
    </TouchableOpacity>
  );
};
```

### Exemple 4 : Afficher les Statistiques

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const HabitStatsExample = ({ habitId }) => {
  const { 
    habits, 
    getCurrentStreak, 
    getLongestStreak,
    getCompletionRate 
  } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  
  const currentStreak = getCurrentStreak(habit);
  const longestStreak = getLongestStreak(habit);
  const completionRate = getCompletionRate(habit, 30);

  return (
    <View>
      <Text>Série actuelle: {currentStreak} jours 🔥</Text>
      <Text>Record: {longestStreak} jours 🏆</Text>
      <Text>Taux (30j): {completionRate}% 📊</Text>
    </View>
  );
};
```

### Exemple 5 : Supprimer une Habitude

```javascript
import React from 'react';
import { Button, Alert } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const DeleteHabitExample = ({ habitId, navigation }) => {
  const { deleteHabit } = useHabits();

  const handleDelete = () => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr ?',
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

  return <Button title="Supprimer" onPress={handleDelete} color="red" />;
};
```

### Exemple 6 : Mettre à Jour une Habitude

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const UpdateHabitExample = ({ habitId }) => {
  const { habits, updateHabit } = useHabits();
  const habit = habits.find(h => h.id === habitId);
  
  const [name, setName] = useState(habit.name);

  const handleUpdate = () => {
    updateHabit(habitId, { name });
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <Button title="Mettre à jour" onPress={handleUpdate} />
    </View>
  );
};
```

---

## 📊 Utilisation des Utilitaires de Statistiques

### Importer les Utilitaires

```javascript
import {
  calculateCurrentStreak,
  calculateLongestStreak,
  calculateCompletionRate,
  generateChartData,
} from '../utils/statistics';
```

### Exemple 7 : Calcul Manuel du Streak

```javascript
import React from 'react';
import { Text } from 'react-native';
import { calculateCurrentStreak } from '../utils/statistics';

const StreakCalculationExample = ({ completions }) => {
  const streak = calculateCurrentStreak(completions);
  
  return <Text>Série: {streak} jours</Text>;
};
```

### Exemple 8 : Générer des Données de Graphique

```javascript
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { generateChartData } from '../utils/statistics';
import { Dimensions } from 'react-native';

const ChartExample = ({ completions }) => {
  const { labels, data } = generateChartData(completions, 7);

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [{ data: data }],
      }}
      width={Dimensions.get('window').width - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
      }}
    />
  );
};
```

---

## 🔔 Utilisation des Notifications

### Importer les Utilitaires

```javascript
import {
  requestNotificationPermissions,
  scheduleHabitNotification,
  cancelHabitNotification,
  sendTestNotification,
} from '../utils/notifications';
```

### Exemple 9 : Demander les Permissions

```javascript
import React, { useEffect } from 'react';
import { requestNotificationPermissions } from '../utils/notifications';

const NotificationPermissionExample = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      const granted = await requestNotificationPermissions();
      if (granted) {
        console.log('Permissions accordées');
      } else {
        console.log('Permissions refusées');
      }
    };
    
    setupNotifications();
  }, []);

  return null;
};
```

### Exemple 10 : Planifier une Notification

```javascript
import React from 'react';
import { Button } from 'react-native';
import { scheduleHabitNotification } from '../utils/notifications';

const ScheduleNotificationExample = ({ habit }) => {
  const handleSchedule = async () => {
    const notificationId = await scheduleHabitNotification(
      habit,
      '09:00'
    );
    console.log('Notification planifiée:', notificationId);
  };

  return <Button title="Activer Rappel" onPress={handleSchedule} />;
};
```

### Exemple 11 : Envoyer une Notification de Test

```javascript
import React from 'react';
import { Button } from 'react-native';
import { sendTestNotification } from '../utils/notifications';

const TestNotificationExample = () => {
  return (
    <Button
      title="Tester Notification"
      onPress={sendTestNotification}
    />
  );
};
```

---

## 🎨 Utilisation des Constantes

### Importer les Constantes

```javascript
import { HABIT_ICONS, HABIT_COLORS, FREQUENCIES } from '../constants';
```

### Exemple 12 : Sélecteur d'Icônes

```javascript
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { HABIT_ICONS } from '../constants';

const IconPickerExample = () => {
  const [selectedIcon, setSelectedIcon] = useState('⭐');

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {HABIT_ICONS.map(icon => (
        <TouchableOpacity
          key={icon}
          onPress={() => setSelectedIcon(icon)}
          style={{
            padding: 10,
            backgroundColor: selectedIcon === icon ? '#4A90E2' : '#fff',
          }}
        >
          <Text style={{ fontSize: 24 }}>{icon}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### Exemple 13 : Sélecteur de Couleurs

```javascript
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { HABIT_COLORS } from '../constants';

const ColorPickerExample = () => {
  const [selectedColor, setSelectedColor] = useState('#4A90E2');

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {HABIT_COLORS.map(color => (
        <TouchableOpacity
          key={color}
          onPress={() => setSelectedColor(color)}
          style={{
            width: 50,
            height: 50,
            backgroundColor: color,
            borderWidth: selectedColor === color ? 3 : 0,
            borderColor: '#000',
            margin: 5,
            borderRadius: 25,
          }}
        />
      ))}
    </View>
  );
};
```

---

## 🧩 Composants Réutilisables

### Exemple 14 : Utiliser StatCard

```javascript
import React from 'react';
import { View } from 'react-native';
import StatCard from '../components/StatCard';

const StatsScreenExample = ({ habit }) => {
  const currentStreak = 5; // Calculé
  const longestStreak = 12; // Calculé
  const completionRate = 75; // Calculé

  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <StatCard
        value={currentStreak}
        label="Série actuelle"
        icon="🔥"
        style={{ flex: 1 }}
      />
      <StatCard
        value={longestStreak}
        label="Record"
        icon="🏆"
        style={{ flex: 1 }}
      />
      <StatCard
        value={`${completionRate}%`}
        label="30 jours"
        icon="📊"
        style={{ flex: 1 }}
      />
    </View>
  );
};
```

---

## 🔄 Navigation

### Exemple 15 : Naviguer vers un Écran

```javascript
import React from 'react';
import { Button } from 'react-native';

const NavigationExample = ({ navigation }) => {
  const goToDetails = () => {
    navigation.navigate('Details', { habitId: '123' });
  };

  return <Button title="Voir Détails" onPress={goToDetails} />;
};
```

### Exemple 16 : Retour Arrière

```javascript
import React from 'react';
import { Button } from 'react-native';

const BackButtonExample = ({ navigation }) => {
  return <Button title="Retour" onPress={() => navigation.goBack()} />;
};
```

---

## 💾 AsyncStorage

### Exemple 17 : Sauvegarder des Données

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
    console.log('Paramètres sauvegardés');
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

### Exemple 18 : Charger des Données

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadSettings = async () => {
  try {
    const data = await AsyncStorage.getItem('settings');
    const settings = data ? JSON.parse(data) : null;
    return settings;
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
};
```

---

## 📅 Gestion des Dates avec dayjs

### Exemple 19 : Formater une Date

```javascript
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

const today = dayjs().format('DD MMMM YYYY');
// "02 décembre 2025"

const shortDate = dayjs().format('DD/MM/YYYY');
// "02/12/2025"
```

### Exemple 20 : Comparer des Dates

```javascript
import dayjs from 'dayjs';

const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

const isYesterday = (date) => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
};

const daysSince = (date) => {
  return dayjs().diff(dayjs(date), 'day');
};
```

---

## 🎭 Hooks Personnalisés

### Exemple 21 : Hook useHabitStats

```javascript
import { useMemo } from 'react';
import { useHabits } from '../contexts/HabitContext';

const useHabitStats = (habitId) => {
  const { habits, getCurrentStreak, getLongestStreak, getCompletionRate } = useHabits();
  
  const habit = useMemo(
    () => habits.find(h => h.id === habitId),
    [habits, habitId]
  );

  const stats = useMemo(() => {
    if (!habit) return null;
    
    return {
      currentStreak: getCurrentStreak(habit),
      longestStreak: getLongestStreak(habit),
      completionRate: getCompletionRate(habit, 30),
    };
  }, [habit, getCurrentStreak, getLongestStreak, getCompletionRate]);

  return { habit, stats };
};

// Utilisation
const MyComponent = ({ habitId }) => {
  const { habit, stats } = useHabitStats(habitId);
  
  return (
    <View>
      <Text>{stats.currentStreak} jours</Text>
    </View>
  );
};
```

---

## ⚡ Optimisations

### Exemple 22 : Memoization avec useMemo

```javascript
import React, { useMemo } from 'react';
import { useHabits } from '../contexts/HabitContext';

const OptimizedStatsExample = ({ habitId }) => {
  const { habits, getCurrentStreak } = useHabits();
  
  const habit = useMemo(
    () => habits.find(h => h.id === habitId),
    [habits, habitId]
  );
  
  const streak = useMemo(
    () => getCurrentStreak(habit),
    [habit, getCurrentStreak]
  );

  return <Text>{streak} jours</Text>;
};
```

### Exemple 23 : Callback avec useCallback

```javascript
import React, { useCallback } from 'react';
import { Button } from 'react-native';
import { useHabits } from '../contexts/HabitContext';

const OptimizedButtonExample = ({ habitId }) => {
  const { toggleCompletion } = useHabits();
  
  const handlePress = useCallback(() => {
    toggleCompletion(habitId);
  }, [habitId, toggleCompletion]);

  return <Button title="Toggle" onPress={handlePress} />;
};
```

---

Ces exemples couvrent les cas d'usage les plus courants de l'application. Pour plus d'informations, consultez le code source dans `src/`.
