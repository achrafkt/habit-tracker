// Icônes disponibles pour les habitudes
export const HABIT_ICONS = [
  '⭐', '💪', '📚', '🏃', '💧', '🧘', 
  '🎯', '✍️', '🎨', '🎵', '🌱', '💼'
];

// Couleurs disponibles pour les habitudes
export const HABIT_COLORS = [
  '#4A90E2', // Bleu
  '#E94B3C', // Rouge
  '#50C878', // Vert
  '#FFB347', // Orange
  '#9B59B6', // Violet
  '#1ABC9C', // Turquoise
  '#E67E22', // Orange foncé
  '#3498DB', // Bleu clair
  '#E91E63', // Rose
  '#00BCD4', // Cyan
  '#FF5722', // Rouge orangé
  '#795548'  // Marron
];

// Fréquences d'habitudes
export const FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly'
};

// Clés de stockage AsyncStorage
export const STORAGE_KEYS = {
  HABITS: 'habits',
  SETTINGS: 'settings'
};

// Paramètres par défaut
export const DEFAULT_SETTINGS = {
  notificationsEnabled: false,
  notificationTime: '09:00',
  theme: 'light'
};
