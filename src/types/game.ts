export type CategoryType = 'friends' | 'couples' | 'party' | 'deep' | 'spicy';

export type PromptType = 'truth' | 'dare';

export type SpecialRoundType = 'double_dare' | 'duo_challenge' | 'revenge' | 'chaos';

export type ScreenType =
  | 'home'
  | 'players'
  | 'categories'
  | 'player_roulette'
  | 'choice'
  | 'question'
  | 'special_round'
  | 'summary';

export interface Player {
  id: string;
  name: string;
  avatarEmoji: string;
  score: number;
  truthsCompleted: number;
  daresCompleted: number;
  specialCompleted: number;
  skipped: number;
}

export interface Category {
  id: CategoryType;
  title: string;
  emoji: string;
  subtitle: string;
  color: string;
  borderAccent: string;
  badgeBg: string;
}

export interface Prompt {
  id: string;
  categoryId: CategoryType;
  type: PromptType;
  text: string;
}

export interface SpecialPrompt {
  id: string;
  type: SpecialRoundType;
  title: string;
  categoryTitle: string;
  prompt: string;
  points: number;
}

export interface Round {
  id: string;
  roundNumber: number;
  targetPlayer: Player;
  challengerPlayer: Player;
  isSpecial: boolean;
  specialType?: SpecialRoundType;
  choice?: PromptType;
  prompt?: Prompt | SpecialPrompt;
  pointsEarned?: number;
  skipped?: boolean;
}

export interface PlayerAward {
  id: string;
  title: string;
  emoji: string;
  playerName: string;
  pillColor: string;
  pillTextColor?: string;
}
