import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ value, label, icon, color = '#4A90E2', style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.icon}>{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  icon: {
    fontSize: 20,
  },
});

export default StatCard;
