import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface StatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  onPress?: () => void;
}

export function StatsCard({ title, count, icon, color, textColor, onPress }: StatsCardProps) {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent 
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.85 : 1}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.title, { color: textColor }]}>
        {title}
      </Text>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
