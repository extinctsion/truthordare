import { Player } from '../types/game';

export const selectTargetAndChallenger = (
  players: Player[],
  previousTargetId?: string
): { target: Player; challenger: Player } => {
  if (!players || players.length < 2) {
    throw new Error('At least 2 players are required');
  }

  // Eligible targets: prioritize players who were not the previous target if players > 2
  let targetCandidates = players;
  if (players.length > 2 && previousTargetId) {
    const filtered = players.filter((p) => p.id !== previousTargetId);
    if (filtered.length > 0) {
      targetCandidates = filtered;
    }
  }

  const targetIndex = Math.floor(Math.random() * targetCandidates.length);
  const target = targetCandidates[targetIndex];

  // Challenger must be a DIFFERENT player
  const challengerCandidates = players.filter((p) => p.id !== target.id);
  const challengerIndex = Math.floor(Math.random() * challengerCandidates.length);
  const challenger = challengerCandidates[challengerIndex];

  return { target, challenger };
};

export const getRandomAvatarEmoji = (index: number): string => {
  const emojis = ['👽', '😈', '💅', '🦄', '🔥', '👑', '⚡', '👻', '😎', '🍕', '🚀', '🦊'];
  return emojis[index % emojis.length];
};
