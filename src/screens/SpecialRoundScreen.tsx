import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SpecialRoundCard } from '../components/game/SpecialRoundCard';
import { Round, SpecialPrompt } from '../types/game';

interface SpecialRoundScreenProps {
  round: Round;
  onAccept: () => void;
}

export const SpecialRoundScreen: React.FC<SpecialRoundScreenProps> = ({
  round,
  onAccept,
}) => {
  if (!round.prompt) return null;

  return (
    <View style={styles.container}>
      <SpecialRoundCard
        prompt={round.prompt as SpecialPrompt}
        onAccept={onAccept}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
