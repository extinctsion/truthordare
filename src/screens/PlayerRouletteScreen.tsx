import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouletteVisual } from '../components/game/RouletteVisual';
import { GradientButton } from '../components/common/GradientButton';
import { Round } from '../types/game';

interface PlayerRouletteScreenProps {
  round: Round;
  onReady: () => void;
}

export const PlayerRouletteScreen: React.FC<PlayerRouletteScreenProps> = ({
  round,
  onReady,
}) => {
  const targetName = round.targetPlayer.name.toUpperCase();
  const challengerName = round.challengerPlayer.name.toUpperCase();

  return (
    <View style={styles.container}>
      {/* Central Animated Roulette */}
      <RouletteVisual emoji={round.targetPlayer.avatarEmoji || '🎯'} isSpinning={true} />

      {/* Active Player Badge */}
      <View style={styles.activeBadge}>
        <Text style={styles.activeBadgeText}>ACTIVE PLAYER</Text>
      </View>

      {/* Target Player Turn Title */}
      <Text style={styles.turnTitle}>🎯 {targetName}'S TURN</Text>

      {/* Challenger Asking Subtitle */}
      <Text style={styles.askingText}>👀 {challengerName} IS ASKING...</Text>

      {/* Ready Button */}
      <View style={styles.footerContainer}>
        <GradientButton title="READY? 🔥" onPress={onReady} />
        <Text style={styles.exitNoteText}>💡 Press back button anytime to exit & view summary</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  activeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FF00A8',
    backgroundColor: 'rgba(255, 0, 168, 0.12)',
    marginBottom: 16,
  },
  activeBadgeText: {
    color: '#FF00A8',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  turnTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  askingText: {
    fontSize: 16,
    color: '#9D8EC4',
    fontWeight: '600',
    marginBottom: 36,
  },
  footerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  exitNoteText: {
    fontSize: 12,
    color: '#7D6EA4',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 16,
  },
});
