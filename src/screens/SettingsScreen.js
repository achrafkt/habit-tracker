import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const handleClearData = () => {
    Alert.alert(
      'Effacer toutes les données',
      'Êtes-vous sûr de vouloir effacer toutes vos habitudes ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Effacer',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('habits');
              Alert.alert('Succès', 'Toutes les données ont été effacées');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erreur', 'Impossible d\'effacer les données');
            }
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'À propos',
      'Habit Tracker v1.0\n\nUne application pour suivre et maintenir vos habitudes quotidiennes.\n\nDéveloppée avec React Native.',
      [{ text: 'OK' }]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, danger = false }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Text style={[styles.settingTitle, danger && styles.dangerText]}>
            {title}
          </Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Général</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="🔔"
              title="Notifications"
              subtitle="Gérer les rappels quotidiens"
              onPress={() => Alert.alert('Info', 'Fonctionnalité en développement')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="🌙"
              title="Thème"
              subtitle="Clair, sombre ou automatique"
              onPress={() => Alert.alert('Info', 'Fonctionnalité en développement')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Données</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="📤"
              title="Exporter les données"
              subtitle="Sauvegarder vos habitudes"
              onPress={() => Alert.alert('Info', 'Fonctionnalité en développement')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="📥"
              title="Importer des données"
              subtitle="Restaurer une sauvegarde"
              onPress={() => Alert.alert('Info', 'Fonctionnalité en développement')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="🗑️"
              title="Effacer toutes les données"
              subtitle="Supprimer toutes les habitudes"
              onPress={handleClearData}
              danger
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="❓"
              title="Aide"
              subtitle="Besoin d'assistance ?"
              onPress={() => Alert.alert('Info', 'Fonctionnalité en développement')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="⭐"
              title="Évaluer l'application"
              subtitle="Partagez votre avis"
              onPress={() => Alert.alert('Merci !', 'Merci de votre soutien')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="ℹ️"
              title="À propos"
              subtitle="Version et informations"
              onPress={handleAbout}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Habit Tracker v1.0</Text>
          <Text style={styles.footerSubtext}>
            Développé avec ❤️ avec React Native
          </Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  settingsGroup: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  dangerText: {
    color: '#E94B3C',
  },
  chevron: {
    fontSize: 24,
    color: '#CCC',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 56,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#BBB',
  },
});

export default SettingsScreen;
