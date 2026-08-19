import { Player, PlayerAward, Round } from '../types/game';

export const SCORE_VALUES = {
  TRUTH: 10,
  DARE: 20,
  SPECIAL: 40,
  SKIP: -50,
};

export const calculatePlayerAwards = (players: Player[], rounds: Round[]): PlayerAward[] => {
  if (!players || players.length === 0) return [];

  const awards: PlayerAward[] = [];

  // 1. Dare King 👑 - Player with most dares completed
  const sortedByDares = [...players].sort((a, b) => b.daresCompleted - a.daresCompleted);
  const dareKing = sortedByDares[0];
  if (dareKing && dareKing.daresCompleted > 0) {
    awards.push({
      id: 'dare_king',
      title: 'Dare King',
      emoji: '👑',
      playerName: dareKing.name,
      pillColor: '#FF007F',
    });
  } else if (players.length > 0) {
    awards.push({
      id: 'dare_king',
      title: 'Dare King',
      emoji: '👑',
      playerName: players[0].name,
      pillColor: '#FF007F',
    });
  }

  // 2. Most Honest 🤫 - Player with most truths completed
  const sortedByTruths = [...players].sort((a, b) => b.truthsCompleted - a.truthsCompleted);
  const mostHonest = sortedByTruths[0];
  if (mostHonest && mostHonest.truthsCompleted > 0) {
    awards.push({
      id: 'most_honest',
      title: 'Most Honest',
      emoji: '🤫',
      playerName: mostHonest.name,
      pillColor: '#00F2FE',
      pillTextColor: '#000',
    });
  } else if (players.length > 1) {
    awards.push({
      id: 'most_honest',
      title: 'Most Honest',
      emoji: '🤫',
      playerName: players[1].name,
      pillColor: '#00F2FE',
      pillTextColor: '#000',
    });
  }

  // 3. Most Chaotic 😂 - Player with highest activity or special rounds
  const sortedByChaos = [...players].sort(
    (a, b) => b.specialCompleted * 2 + b.daresCompleted - a.specialCompleted * 2 - a.daresCompleted
  );
  const mostChaotic = sortedByChaos[0];
  if (mostChaotic) {
    awards.push({
      id: 'most_chaotic',
      title: 'Most Chaotic',
      emoji: '😂',
      playerName: mostChaotic.name,
      pillColor: '#FF6B00',
    });
  }

  // 4. Fearless ⚡ - Player with highest total score and fewest skips
  const sortedByScore = [...players].sort((a, b) => b.score - a.score);
  const fearless = sortedByScore[0];
  if (fearless && !awards.some((a) => a.playerName === fearless.name)) {
    awards.push({
      id: 'fearless',
      title: 'Fearless',
      emoji: '⚡',
      playerName: fearless.name,
      pillColor: '#A855F7',
    });
  }

  return awards;
};
