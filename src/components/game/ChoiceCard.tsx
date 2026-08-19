import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

interface ChoiceCardProps {
  type: 'truth' | 'dare';
  onSelect: () => void;
  style?: ViewStyle;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ type, onSelect, style }) => {
  const isTruth = type === 'truth';

  const colors = isTruth
    ? (['#00F2FE', '#4A00E0', '#7F00FF'] as const)
    : (['#FF9900', '#FF007F', '#D012FF'] as const);

  const emoji = isTruth ? '👀' : '😈';
  const title = isTruth ? 'TRUTH' : 'DARE';
  const subtitle = isTruth ? 'Spill the deepest secrets' : 'Perform absolute madness';

  const handlePress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {}
    onSelect();
  };

  return (
    <TouchableOpacity activeOpacity={0.88} onPress={handlePress} style={[styles.wrapper, style]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  gradient: {
    width: '100%',
    height: '100%',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
});
