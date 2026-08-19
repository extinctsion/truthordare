import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradientButton } from '../components/common/GradientButton';

interface HowToPlayModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>How to Play 📖</Text>
          
          <ScrollView style={styles.body}>
            <Text style={styles.stepTitle}>1. Add Friends 👥</Text>
            <Text style={styles.stepDesc}>Add at least 2 players to start the game.</Text>

            <Text style={styles.stepTitle}>2. Pick Categories 🎭</Text>
            <Text style={styles.stepDesc}>Choose vibes ranging from casual Friends to Spicy chaos.</Text>

            <Text style={styles.stepTitle}>3. Random Target & Challenger 🎯</Text>
            <Text style={styles.stepDesc}>The app spins to pick a target and a separate challenger.</Text>

            <Text style={styles.stepTitle}>4. Truth or Dare Card 🃏</Text>
            <Text style={styles.stepDesc}>Choose your prompt. Earn +10 pts for Truth, +20 pts for Dare, and +40 pts for Special Rounds!</Text>

            <Text style={styles.stepTitle}>5. Beware the Skip Penalty ⚠️</Text>
            <Text style={styles.stepDesc}>Skipping a prompt costs -50 pts!</Text>
          </ScrollView>

          <GradientButton title="GOT IT! 👍" onPress={onClose} style={styles.closeBtn} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#17102B',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#7F00FF',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  body: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF00A8',
    marginTop: 12,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#E2D9F3',
    lineHeight: 20,
  },
  closeBtn: {
    marginTop: 8,
  },
});
