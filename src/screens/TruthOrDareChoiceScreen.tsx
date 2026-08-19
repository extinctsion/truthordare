import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/common/Header';
import { ChoiceCard } from '../components/game/ChoiceCard';
import { PromptType, Round } from '../types/game';

interface TruthOrDareChoiceScreenProps {
  round: Round;
  onSelectChoice: (choice: PromptType) => void;
}

export const TruthOrDareChoiceScreen: React.FC<TruthOrDareChoiceScreenProps> = ({
  round,
  onSelectChoice,
}) => {
  const targetName = round.targetPlayer.name;

  return (
    <View style={styles.container}>
      <Header
        title={`${targetName}, choose...`}
        subtitle="Select your fate. No chickening out!"
      />

      <View style={styles.cardsContainer}>
        <ChoiceCard type="truth" onSelect={() => onSelectChoice('truth')} />
        <ChoiceCard type="dare" onSelect={() => onSelectChoice('dare')} />
      </View>

      <View style={styles.footerNotes}>
        <Text style={styles.noteText}>⚠️ Pressing either card starts the 30-sec round timer</Text>
        <Text style={styles.exitNoteText}>💡 Press back button anytime to exit & view summary</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  cardsContainer: {
    width: '100%',
  },
  footerNotes: {
    alignItems: 'center',
    gap: 6,
  },
  noteText: {
    fontSize: 13,
    color: '#9D8EC4',
    textAlign: 'center',
    fontWeight: '600',
  },
  exitNoteText: {
    fontSize: 12,
    color: '#7D6EA4',
    textAlign: 'center',
    fontWeight: '600',
  },
});
