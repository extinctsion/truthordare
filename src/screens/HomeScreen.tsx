import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientButton } from '../components/common/GradientButton';

interface HomeScreenProps {
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  onOpenSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onOpenHowToPlay,
  onOpenSettings,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Flame Icon with Aura */}
      <View style={styles.flameContainer}>
        <View style={styles.flameAura} />
        <Text style={styles.flameEmoji}>🔥</Text>
      </View>

      {/* Main App Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.titleText, { color: '#00F2FE' }]}>TRUTH</Text>
        <Text style={[styles.titleTextSmall, { color: '#FF00A8' }]}>OR</Text>
        <Text style={[styles.titleText, { color: '#FF4500' }]}>DARE</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Let the chaos begin 😈</Text>

      {/* Main Start Game Action */}
      <GradientButton
        title="START GAME 🚀"
        onPress={onStartGame}
        style={styles.startButton}
      />

      {/* Auxiliary Actions */}
      <View style={styles.linksContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={onOpenHowToPlay} style={styles.linkButton}>
          <Text style={styles.linkText}>How to Play 📖</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onOpenSettings} style={styles.linkButton}>
          <Text style={styles.linkText}>Settings ⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  flameContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  flameAura: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(168, 85, 247, 0.25)',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 25,
    elevation: 15,
  },
  flameEmoji: {
    fontSize: 52,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 58,
  },
  titleTextSmall: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
    lineHeight: 38,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#9D8EC4',
    fontWeight: '600',
    marginBottom: 48,
  },
  startButton: {
    marginBottom: 32,
  },
  linksContainer: {
    alignItems: 'center',
    gap: 14,
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  linkText: {
    color: '#9D8EC4',
    fontSize: 15,
    fontWeight: '600',
  },
});
