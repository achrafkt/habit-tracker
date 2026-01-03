import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, themeMode, setTheme } = useTheme();
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  // Debug: log user data
  console.log('SettingsScreen - isAuthenticated:', isAuthenticated);
  console.log('SettingsScreen - user:', user);

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

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
        return 'Automatic';
      default:
        return 'Light';
    }
  };

  const ThemeModal = () => (
    <Modal
      visible={themeModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setThemeModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setThemeModalVisible(false)}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>Choose theme</Text>
          
          <TouchableOpacity
            style={[
              styles.themeOption,
              themeMode === 'light' && styles.themeOptionSelected,
              { borderColor: theme.border }
            ]}
            onPress={() => {
              setTheme('light');
              setThemeModalVisible(false);
            }}
          >
            <Text style={styles.themeEmoji}>☀️</Text>
            <View style={styles.themeOptionText}>
              <Text style={[styles.themeOptionTitle, { color: theme.text }]}>Light</Text>
              <Text style={[styles.themeOptionSubtitle, { color: theme.textSecondary }]}>
                Clear and bright
              </Text>
            </View>
            {themeMode === 'light' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              themeMode === 'dark' && styles.themeOptionSelected,
              { borderColor: theme.border }
            ]}
            onPress={() => {
              setTheme('dark');
              setThemeModalVisible(false);
            }}
          >
            <Text style={styles.themeEmoji}>🌙</Text>
            <View style={styles.themeOptionText}>
              <Text style={[styles.themeOptionTitle, { color: theme.text }]}>Dark</Text>
              <Text style={[styles.themeOptionSubtitle, { color: theme.textSecondary }]}>
                Easy on the eyes
              </Text>
            </View>
            {themeMode === 'dark' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeOption,
              themeMode === 'auto' && styles.themeOptionSelected,
              { borderColor: theme.border }
            ]}
            onPress={() => {
              setTheme('auto');
              setThemeModalVisible(false);
            }}
          >
            <Text style={styles.themeEmoji}>⚙️</Text>
            <View style={styles.themeOptionText}>
              <Text style={[styles.themeOptionTitle, { color: theme.text }]}>Automatic</Text>
              <Text style={[styles.themeOptionSubtitle, { color: theme.textSecondary }]}>
                Follows system settings
              </Text>
            </View>
            {themeMode === 'auto' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const SettingItem = ({ icon, title, subtitle, onPress, danger = false }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View>
          <Text style={[
            styles.settingTitle, 
            { color: theme.text },
            danger && { color: theme.danger }
          ]}>
            {title}
          </Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: theme.textTertiary }]}>{subtitle}</Text>}
        </View>
      </View>
      <Text style={[styles.chevron, { color: theme.border }]}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ThemeModal />
      <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isAuthenticated ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account</Text>
            <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Text style={styles.settingIcon}>👤</Text>
                  <View>
                    <Text style={[styles.settingTitle, { color: theme.text }]}>Profile</Text>
                    <Text style={[styles.settingSubtitle, { color: theme.textTertiary }]}>{user?.name}</Text>
                    <Text style={[styles.settingSubtitle, { color: theme.textTertiary }]}>{user?.email}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Account</Text>
            <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground }]}>
              <SettingItem
                icon="👤"
                title="Login"
                subtitle="Connect to sync your habits"
                onPress={() => navigation.navigate('Login')}
              />
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
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
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>General</Text>
          <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground }]}>
            <SettingItem
              icon="🔔"
              title="Notifications"
              subtitle="Manage daily reminders"
              onPress={() => Alert.alert('Info', 'Feature in development')}
            />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <SettingItem
              icon="🌙"
              title="Theme"
              subtitle={getThemeLabel()}
              onPress={() => setThemeModalVisible(true)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Support</Text>
          <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground }]}>
            <SettingItem
              icon="❓"
              title="Help"
              subtitle="Need assistance?"
              onPress={() => Alert.alert('Info', 'Feature in development')}
            />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <SettingItem
              icon="⭐"
              title="Rate the app"
              subtitle="Share your feedback"
              onPress={() => Alert.alert('Thank you!', 'Thank you for your support')}
            />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
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
            <View style={[styles.settingsGroup, { backgroundColor: theme.cardBackground }]}>
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
            Développé avec ❤️ par Achraf Karati
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 12,
  },
  themeOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
  },
  themeEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  themeOptionText: {
    flex: 1,
  },
  themeOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  themeOptionSubtitle: {
    fontSize: 13,
  },
  checkmark: {
    fontSize: 20,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
