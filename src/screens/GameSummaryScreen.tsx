import React from 'react';
import { Alert, Share, StyleSheet, View } from 'react-native';
import { Header } from '../components/common/Header';
import { GradientButton } from '../components/common/GradientButton';
import { OutlineButton } from '../components/common/OutlineButton';
import { SummaryCard } from '../components/game/SummaryCard';
import { Player, Round } from '../types/game';
import { calculatePlayerAwards } from '../utils/scoring';

interface GameSummaryScreenProps {
  players: Player[];
  roundsHistory: Round[];
  onPlayAgain: () => void;
}

export const GameSummaryScreen: React.FC<GameSummaryScreenProps> = ({
  players,
  roundsHistory,
  onPlayAgain,
}) => {
  const roundsPlayed = roundsHistory.length || 1;
  const daresNailed = players.reduce((sum, p) => sum + p.daresCompleted + p.specialCompleted, 0);
  const awards = calculatePlayerAwards(players, roundsHistory);

  const handleShare = async () => {
    try {
      const summaryText = `🔥 Truth or Dare Party Stats! 🔥\n` +
        `Rounds Played: ${roundsPlayed}\n` +
        `Dares Nailed: ${daresNailed}\n` +
        `Awards:\n` +
        awards.map((a) => `${a.emoji} ${a.title}: ${a.playerName}`).join('\n') +
        `\nPlay now completely offline!`;

      await Share.share({
        message: summaryText,
      });
    } catch {
      Alert.alert('Party Results', 'Results copied! Share them with your friends.');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="What a game! 🔥"
        subtitle="You all survived the extreme chaos"
      />

      <SummaryCard
        roundsPlayed={roundsPlayed}
        daresNailed={daresNailed}
        awards={awards}
      />

      <View style={styles.actionsContainer}>
        <GradientButton title="PLAY AGAIN 🔄" onPress={onPlayAgain} style={styles.button} />
        <OutlineButton title="SHARE RESULTS 📥" onPress={handleShare} />
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
    paddingBottom: 32,
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    marginBottom: 4,
  },
});
