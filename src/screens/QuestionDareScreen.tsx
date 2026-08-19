import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientButton } from '../components/common/GradientButton';
import { OutlineButton } from '../components/common/OutlineButton';
import { QuestionCard } from '../components/game/QuestionCard';
import { Prompt, PromptType, Round } from '../types/game';

interface QuestionDareScreenProps {
  round: Round;
  onComplete: (done: boolean) => void;
  onEndGame: () => void;
}

export const QuestionDareScreen: React.FC<QuestionDareScreenProps> = ({
  round,
  onComplete,
  onEndGame,
}) => {
  if (!round.prompt || !round.choice) return null;

  return (
    <View style={styles.container}>
      {/* Top Header Row with End Game Shortcut */}
      <View style={styles.topRow}>
        <Text style={styles.roundBadge}>ROUND {round.roundNumber}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onEndGame} style={styles.endGameBtn}>
          <Text style={styles.endGameText}>End Game 🏁</Text>
        </TouchableOpacity>
      </View>

      {/* Question Card */}
      <QuestionCard
        prompt={round.prompt as Prompt}
        choice={round.choice as PromptType}
        challengerName={round.challengerPlayer.name}
        targetName={round.targetPlayer.name}
      />

      {/* Bottom Action Buttons */}
      <View style={styles.actionsContainer}>
        <GradientButton
          title="DONE ✓"
          onPress={() => onComplete(true)}
          style={styles.doneBtn}
        />
        <OutlineButton
          title="SKIP ROUND (-50 PTS)"
          onPress={() => onComplete(false)}
        />
        <Text style={styles.exitNoteText}>💡 Press back button or End Game to finish & view summary</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  roundBadge: {
    color: '#9D8EC4',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  endGameBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  endGameText: {
    color: '#FF00A8',
    fontSize: 13,
    fontWeight: '700',
  },
  actionsContainer: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
  doneBtn: {
    marginBottom: 2,
  },
  exitNoteText: {
    fontSize: 12,
    color: '#7D6EA4',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 4,
  },
});
