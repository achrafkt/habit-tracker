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
import { useAuth } from '../contexts/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About',
      'Habit Tracker v1.0\n\nAn application to track and maintain your daily habits.\n\nDeveloped with React Native & Laravel.',
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
        {isAuthenticated ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.settingsGroup}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Text style={styles.settingIcon}>👤</Text>
                  <View>
                    <Text style={styles.settingTitle}>Profile</Text>
                    <Text style={styles.settingSubtitle}>{user?.name}</Text>
                    <Text style={styles.settingSubtitle}>{user?.email}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon="👤"
                title="Login"
                subtitle="Connect to sync your habits"
                onPress={() => navigation.navigate('Login')}
              />
              <View style={styles.divider} />
              <SettingItem
                icon="✨"
                title="Register"
                subtitle="Create a new account"
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="🔔"
              title="Notifications"
              subtitle="Manage daily reminders"
              onPress={() => Alert.alert('Info', 'Feature in development')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="🌙"
              title="Theme"
              subtitle="Light, dark or automatic"
              onPress={() => Alert.alert('Info', 'Feature in development')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingsGroup}>
            <SettingItem
              icon="❓"
              title="Help"
              subtitle="Need assistance?"
              onPress={() => Alert.alert('Info', 'Feature in development')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="⭐"
              title="Rate the app"
              subtitle="Share your feedback"
              onPress={() => Alert.alert('Thank you!', 'Thank you for your support')}
            />
            <View style={styles.divider} />
            <SettingItem
              icon="ℹ️"
              title="About"
              subtitle="Version and information"
              onPress={handleAbout}
            />
          </View>
        </View>

        {isAuthenticated && (
          <View style={styles.section}>
            <View style={styles.settingsGroup}>
              <SettingItem
                icon="🚪"
                title="Logout"
                subtitle="Sign out of your account"
                onPress={handleLogout}
                danger
              />
            </View>
          </View>
        )}

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
