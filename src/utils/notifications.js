import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuration des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Demande la permission pour envoyer des notifications
 */
export const requestNotificationPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Permission de notification refusée');
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4A90E2',
      });
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la demande de permission:', error);
    return false;
  }
};

/**
 * Planifie une notification quotidienne pour une habitude
 * @param {Object} habit - L'habitude pour laquelle planifier la notification
 * @param {string} time - Heure de la notification au format HH:mm
 */
export const scheduleHabitNotification = async (habit, time = '09:00') => {
  try {
    const [hours, minutes] = time.split(':').map(Number);

    const trigger = {
      hour: hours,
      minute: minutes,
      repeats: true,
    };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Rappel d\'habitude',
        body: `N'oubliez pas : ${habit.name}`,
        data: { habitId: habit.id },
        sound: true,
      },
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Erreur lors de la planification de la notification:', error);
    return null;
  }
};

/**
 * Annule toutes les notifications planifiées pour une habitude
 * @param {string} notificationId - ID de la notification à annuler
 */
export const cancelHabitNotification = async (notificationId) => {
  try {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
  } catch (error) {
    console.error('Erreur lors de l\'annulation de la notification:', error);
  }
};

/**
 * Annule toutes les notifications planifiées
 */
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Erreur lors de l\'annulation de toutes les notifications:', error);
  }
};

/**
 * Récupère toutes les notifications planifiées
 */
export const getAllScheduledNotifications = async () => {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    return notifications;
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    return [];
  }
};

/**
 * Envoie une notification immédiate (pour les tests)
 */
export const sendTestNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎉 Test de notification',
        body: 'Les notifications fonctionnent correctement !',
        sound: true,
      },
      trigger: null, // Envoyer immédiatement
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification de test:', error);
  }
};
