import dayjs from 'dayjs';

/**
 * Calcule le streak actuel d'une habitude
 * @param {Array} completions - Tableau des dates de complétion
 * @returns {number} Nombre de jours consécutifs
 */
export const calculateCurrentStreak = (completions) => {
  if (!completions || completions.length === 0) return 0;

  const sortedCompletions = [...completions].sort().reverse();
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

/**
 * Calcule le plus long streak d'une habitude
 * @param {Array} completions - Tableau des dates de complétion
 * @returns {number} Plus long nombre de jours consécutifs
 */
export const calculateLongestStreak = (completions) => {
  if (!completions || completions.length === 0) return 0;

  const sortedCompletions = [...completions].sort();
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

/**
 * Calcule le taux de complétion sur une période
 * @param {Array} completions - Tableau des dates de complétion
 * @param {number} days - Nombre de jours à considérer
 * @returns {number} Pourcentage de complétion (0-100)
 */
export const calculateCompletionRate = (completions, days = 30) => {
  if (!completions || completions.length === 0) return 0;

  const startDate = dayjs().subtract(days, 'day');
  const completionsInPeriod = completions.filter(date => 
    dayjs(date).isAfter(startDate) || dayjs(date).isSame(startDate)
  ).length;
  
  return Math.round((completionsInPeriod / days) * 100);
};

/**
 * Génère les données pour un graphique sur N jours
 * @param {Array} completions - Tableau des dates de complétion
 * @param {number} days - Nombre de jours à afficher
 * @returns {Object} Labels et données pour le graphique
 */
export const generateChartData = (completions, days = 7) => {
  const labels = [];
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day');
    labels.push(date.format('DD/MM'));
    data.push(completions.includes(date.format('YYYY-MM-DD')) ? 1 : 0);
  }
  
  return { labels, data };
};

/**
 * Calcule le total de complétions
 * @param {Array} completions - Tableau des dates de complétion
 * @returns {number} Nombre total de complétions
 */
export const getTotalCompletions = (completions) => {
  return completions ? completions.length : 0;
};

/**
 * Récupère la date de la dernière complétion
 * @param {Array} completions - Tableau des dates de complétion
 * @returns {string|null} Date formatée ou null
 */
export const getLastCompletionDate = (completions) => {
  if (!completions || completions.length === 0) return null;
  
  const sortedCompletions = [...completions].sort().reverse();
  return sortedCompletions[0];
};

/**
 * Vérifie si une habitude est complétée aujourd'hui
 * @param {Array} completions - Tableau des dates de complétion
 * @returns {boolean} True si complété aujourd'hui
 */
export const isCompletedToday = (completions) => {
  if (!completions) return false;
  const today = dayjs().format('YYYY-MM-DD');
  return completions.includes(today);
};

/**
 * Calcule les statistiques globales pour toutes les habitudes
 * @param {Array} habits - Tableau de toutes les habitudes
 * @returns {Object} Statistiques globales
 */
export const calculateGlobalStats = (habits) => {
  if (!habits || habits.length === 0) {
    return {
      totalHabits: 0,
      totalCompletions: 0,
      averageCompletionRate: 0,
      longestStreak: 0,
      activeHabits: 0,
    };
  }

  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((sum, habit) => 
    sum + getTotalCompletions(habit.completions), 0
  );
  
  const averageCompletionRate = Math.round(
    habits.reduce((sum, habit) => 
      sum + calculateCompletionRate(habit.completions, 30), 0
    ) / totalHabits
  );

  const longestStreak = Math.max(
    ...habits.map(habit => calculateLongestStreak(habit.completions)),
    0
  );

  const activeHabits = habits.filter(habit => 
    calculateCurrentStreak(habit.completions) > 0
  ).length;

  return {
    totalHabits,
    totalCompletions,
    averageCompletionRate,
    longestStreak,
    activeHabits,
  };
};
