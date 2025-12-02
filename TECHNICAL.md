# 🔧 Documentation Technique - Habit Tracker

## 📋 Architecture de l'Application

### Structure des Dossiers

```
habit-tracker/
├── src/
│   ├── components/          # Composants réutilisables
│   │   └── StatCard.js
│   ├── contexts/           # Context API (gestion d'état)
│   │   └── HabitContext.js
│   ├── navigation/         # Configuration React Navigation
│   │   └── AppNavigator.js
│   ├── screens/           # Écrans de l'application
│   │   ├── HomeScreen.js
│   │   ├── AddHabitScreen.js
│   │   ├── DetailsScreen.js
│   │   └── SettingsScreen.js
│   ├── utils/             # Utilitaires
│   │   ├── notifications.js
│   │   └── statistics.js
│   └── constants/         # Constantes
│       └── index.js
├── assets/                # Images et ressources
├── App.js                # Point d'entrée
└── app.json              # Configuration Expo
```

## 🏗️ Architecture Globale

### Pattern Utilisé
- **Context API** pour la gestion d'état globale
- **React Navigation** pour la navigation
- **AsyncStorage** pour la persistance

### Flux de Données

```
User Action → Context API → AsyncStorage → UI Update
     ↓            ↓              ↓            ↓
  Écran     HabitContext    Stockage     Re-render
```

## 📦 Modèle de Données

### Structure d'une Habitude

```javascript
{
  id: string,                    // Timestamp unique
  name: string,                  // Nom de l'habitude
  icon: string,                  // Emoji
  color: string,                 // Code couleur hex
  frequency: 'daily' | 'weekly', // Fréquence
  completions: string[],         // Dates au format YYYY-MM-DD
  createdAt: string,             // Date de création YYYY-MM-DD
  notificationEnabled: boolean,  // Notifications activées
  notificationTime: string,      // Heure au format HH:mm
}
```

### Exemple

```javascript
{
  id: "1701518400000",
  name: "Méditer 10 minutes",
  icon: "🧘",
  color: "#4A90E2",
  frequency: "daily",
  completions: [
    "2025-12-01",
    "2025-12-02",
    "2025-12-03"
  ],
  createdAt: "2025-12-01",
  notificationEnabled: false,
  notificationTime: "09:00"
}
```

## 🔄 Context API - HabitContext

### État Global

```javascript
{
  habits: Habit[],     // Tableau de toutes les habitudes
  loading: boolean,    // État de chargement
}
```

### Actions Disponibles

| Action | Description | Paramètres |
|--------|-------------|------------|
| `addHabit` | Ajoute une nouvelle habitude | `habit: Partial<Habit>` |
| `updateHabit` | Met à jour une habitude | `id: string, updates: Partial<Habit>` |
| `deleteHabit` | Supprime une habitude | `id: string` |
| `toggleCompletion` | Bascule la complétion du jour | `id: string` |
| `isCompletedToday` | Vérifie si complété aujourd'hui | `habit: Habit` → `boolean` |
| `getCurrentStreak` | Calcule la série actuelle | `habit: Habit` → `number` |
| `getLongestStreak` | Calcule le record | `habit: Habit` → `number` |
| `getCompletionRate` | Calcule le taux sur N jours | `habit: Habit, days: number` → `number` |

### Utilisation

```javascript
import { useHabits } from '../contexts/HabitContext';

function MyComponent() {
  const { habits, addHabit, toggleCompletion } = useHabits();
  
  // Ajouter une habitude
  const handleAdd = () => {
    addHabit({
      name: "Lire 20 pages",
      icon: "📚",
      color: "#50C878",
      frequency: "daily"
    });
  };
  
  // Marquer comme complété
  const handleToggle = (habitId) => {
    toggleCompletion(habitId);
  };
}
```

## 🗄️ Stockage Local - AsyncStorage

### Clés Utilisées

- `habits` : Tableau de toutes les habitudes (JSON stringifié)
- `settings` : Paramètres de l'application (à venir)

### Opérations

```javascript
// Lecture
const habits = await AsyncStorage.getItem('habits');
const parsed = JSON.parse(habits);

// Écriture
await AsyncStorage.setItem('habits', JSON.stringify(habitsArray));

// Suppression
await AsyncStorage.removeItem('habits');
```

### Persistence

- Sauvegarde automatique à chaque modification via `useEffect`
- Chargement au démarrage de l'application
- Synchrone avec l'état React

## 🧮 Algorithmes de Calcul

### Calcul du Streak Actuel

```javascript
const calculateCurrentStreak = (completions) => {
  // 1. Trier les dates en ordre décroissant
  const sorted = [...completions].sort().reverse();
  
  // 2. Vérifier si aujourd'hui ou hier est complété
  const today = dayjs().format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  
  if (sorted[0] !== today && sorted[0] !== yesterday) {
    return 0; // Série cassée
  }
  
  // 3. Compter les jours consécutifs
  let streak = 0;
  for (let i = 0; i < sorted.length; i++) {
    const expected = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
    if (sorted[i] === expected) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};
```

### Calcul du Record (Longest Streak)

```javascript
const calculateLongestStreak = (completions) => {
  const sorted = [...completions].sort();
  let maxStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < sorted.length; i++) {
    const daysDiff = dayjs(sorted[i]).diff(dayjs(sorted[i-1]), 'day');
    
    if (daysDiff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }
  
  return maxStreak;
};
```

### Taux de Complétion

```javascript
const calculateCompletionRate = (completions, days = 30) => {
  const startDate = dayjs().subtract(days, 'day');
  const count = completions.filter(date => 
    dayjs(date).isAfter(startDate)
  ).length;
  
  return Math.round((count / days) * 100);
};
```

## 📊 Graphiques - react-native-chart-kit

### Configuration

```javascript
<LineChart
  data={{
    labels: ['01/12', '02/12', '03/12', ...],
    datasets: [{ data: [1, 0, 1, ...] }]
  }}
  width={Dimensions.get('window').width - 60}
  height={200}
  chartConfig={{
    backgroundColor: '#FFF',
    backgroundGradientFrom: '#FFF',
    backgroundGradientTo: '#FFF',
    color: (opacity = 1) => habitColor,
    labelColor: (opacity = 1) => '#000',
  }}
  bezier
/>
```

### Génération des Données

```javascript
const getLast7DaysData = (completions) => {
  const labels = [];
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day');
    labels.push(date.format('DD/MM'));
    data.push(completions.includes(date.format('YYYY-MM-DD')) ? 1 : 0);
  }
  
  return { labels, data };
};
```

## 🔔 Notifications - expo-notifications

### Configuration

```javascript
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
```

### Planification

```javascript
const scheduleHabitNotification = async (habit, time = '09:00') => {
  const [hours, minutes] = time.split(':').map(Number);
  
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏰ Rappel d\'habitude',
      body: `N'oubliez pas : ${habit.name}`,
      data: { habitId: habit.id },
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });
  
  return notificationId;
};
```

## 🎨 Style et Thème

### Palette de Couleurs

```javascript
const COLORS = {
  background: '#F5F7FA',
  cardBackground: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#E0E0E0',
  primary: '#4A90E2',
  success: '#50C878',
  danger: '#E94B3C',
};
```

### Typographie

```javascript
const TYPOGRAPHY = {
  title: { fontSize: 28, fontWeight: 'bold' },
  heading: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
};
```

### Espacements

```javascript
const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
};
```

## 🚀 Optimisations

### Performance

1. **Memoization**
```javascript
const memoizedStreak = useMemo(
  () => getCurrentStreak(habit),
  [habit.completions]
);
```

2. **Lazy Loading**
- Chargement différé des graphiques
- Pagination pour grandes listes

3. **Debouncing**
- Sauvegardes AsyncStorage optimisées

### Gestion de la Mémoire

- Nettoyage des listeners dans `useEffect`
- Éviter les fuites mémoire dans les timers
- Optimisation des re-renders avec `React.memo`

## 🧪 Tests (À Implémenter)

### Tests Unitaires

```javascript
// Utils
describe('calculateCurrentStreak', () => {
  it('should return 0 for empty array', () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });
  
  it('should calculate streak correctly', () => {
    const completions = [
      '2025-12-01',
      '2025-12-02',
      '2025-12-03'
    ];
    expect(calculateCurrentStreak(completions)).toBe(3);
  });
});
```

### Tests d'Intégration

```javascript
// Context
describe('HabitContext', () => {
  it('should add habit', () => {
    const { result } = renderHook(() => useHabits());
    
    act(() => {
      result.current.addHabit({
        name: 'Test Habit',
        icon: '⭐',
        color: '#4A90E2',
        frequency: 'daily'
      });
    });
    
    expect(result.current.habits).toHaveLength(1);
  });
});
```

## 🔐 Sécurité

### Données Locales
- Stockage sécurisé avec AsyncStorage
- Pas de transmission réseau
- Données chiffrées par l'OS

### Permissions
- Notifications : demandées à l'utilisation
- Stockage : automatique (React Native)

## 📱 Compatibilité

### Plateformes
- ✅ iOS 13+
- ✅ Android 5.0+ (API 21+)
- ✅ Web (expérimental)

### Appareils
- Téléphones
- Tablettes
- Responsive design

## 🐛 Débogage

### Outils

```javascript
// Activer les logs
if (__DEV__) {
  console.log('Habits:', habits);
  console.log('Streak:', getCurrentStreak(habit));
}
```

### React DevTools
- Inspecter le state
- Analyser les re-renders
- Profiler les performances

### Expo DevTools
- Metro Bundler
- Logs en temps réel
- Hot reload

## 📚 Références

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [dayjs](https://day.js.org/)
- [react-native-chart-kit](https://www.npmjs.com/package/react-native-chart-kit)

---

**Dernière mise à jour** : Décembre 2025
**Version** : 1.0.0
