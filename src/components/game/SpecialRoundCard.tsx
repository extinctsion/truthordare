import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SpecialPrompt } from '../../types/game';
import { GradientButton } from '../common/GradientButton';

interface SpecialRoundCardProps {
  prompt: SpecialPrompt;
  onAccept: () => void;
}

export const SpecialRoundCard: React.FC<SpecialRoundCardProps> = ({ prompt, onAccept }) => {
  return (
    <View style={styles.container}>
      {/* Top Flame Box */}
      <View style={styles.flameBox}>
        <Text style={styles.flameEmoji}>🔥</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{prompt.title}</Text>

      {/* Category Pill */}
      <View style={styles.categoryPill}>
        <Text style={styles.categoryPillText}>{prompt.categoryTitle}</Text>
      </View>

      {/* Card Body */}
      <View style={styles.card}>
        <Text style={styles.cardTag}>DUO CHALLENGE 🤝</Text>
        <Text style={styles.promptText}>{prompt.prompt}</Text>
      </View>

      {/* CTA Button */}
      <GradientButton
        title="BRING IT ON ⚔️"
        onPress={onAccept}
        colors={['#FF3B00', '#FF007F', '#B000FF']}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  flameBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FF4500',
    backgroundColor: 'rgba(255, 69, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  flameEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF3B00',
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryPill: {
    backgroundColor: '#FF00A8',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  categoryPillText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
  card: {
    width: '100%',
    minHeight: 200,
    backgroundColor: '#17102B',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FF00A8',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#FF00A8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  cardTag: {
    color: '#FF00A8',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 16,
  },
  promptText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
  },
  button: {
    marginTop: 8,
  },
});
