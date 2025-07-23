import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Sparkles, Leaf } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';

interface EmptyStateProps {
  title: string;
  buttonText: string;
  onButtonPress: () => void;
}

export function EmptyState({ title, buttonText, onButtonPress }: EmptyStateProps) {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Premium icon area */}
      <View style={styles.iconSection}>
        <LinearGradient
          colors={['#ffecd2', '#fcb69f', '#a8edea']}
          style={styles.iconContainer}
        >
          <View style={styles.iconWrapper}>
            <Leaf size={32} color="#667eea" strokeWidth={2} />
          </View>
          
          {/* Exquisite decorative elements */}
          <View style={styles.iconDecorations}>
            <View style={styles.sparkle1}>
              <Sparkles size={10} color="rgba(102, 126, 234, 0.6)" />
            </View>
            <View style={styles.sparkle2}>
              <Sparkles size={6} color="rgba(118, 75, 162, 0.4)" />
            </View>
            <View style={styles.sparkle3}>
              <View style={styles.miniDot} />
            </View>
          </View>
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      {/* Exquisite decorative line */}
      <View style={styles.decorationContainer}>
        <LinearGradient
          colors={['transparent', '#667eea', '#764ba2', '#f093fb', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.decorationLine}
        />
        <View style={styles.decorationDots}>
          <View style={[styles.decorationDot, { backgroundColor: '#667eea' }]} />
          <View style={[styles.decorationDot, { backgroundColor: '#764ba2' }]} />
          <View style={[styles.decorationDot, { backgroundColor: '#f093fb' }]} />
        </View>
      </View>
      
      {/* Premium button */}
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Plus size={18} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.buttonText}>{buttonText}</Text>
          
          {/* Button shine effect */}
          <View style={styles.buttonShine} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
    marginHorizontal: 24,
  },
  iconSection: {
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 12,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  iconDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle1: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle2: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle3: {
    position: 'absolute',
    top: 35,
    left: 15,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#667eea',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  decorationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  decorationLine: {
    width: 120,
    height: 3,
    borderRadius: 1.5,
    marginBottom: 16,
  },
  decorationDots: {
    flexDirection: 'row',
    gap: 8,
  },
  decorationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  button: {
    borderRadius: 28,
    elevation: 12,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 28,
    position: 'relative',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  buttonShine: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ skewX: '-20deg' }],
  },
});
