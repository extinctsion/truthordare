import { useState, useCallback } from 'react';
import {
  CategoryType,
  Player,
  Prompt,
  PromptType,
  Round,
  ScreenType,
  SpecialPrompt,
} from '../types/game';
import { CATEGORIES } from '../data/categories';
import { PROMPTS, SPECIAL_PROMPTS } from '../data/prompts';
import { selectTargetAndChallenger, getRandomAvatarEmoji } from '../utils/roulette';
import { SCORE_VALUES } from '../utils/scoring';

const INITIAL_PLAYERS: Player[] = [];


export const useGameState = () => {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(['friends', 'party', 'spicy']);
  const [currentRoundNumber, setCurrentRoundNumber] = useState<number>(1);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [roundsHistory, setRoundsHistory] = useState<Round[]>([]);
  const [usedPromptIds, setUsedPromptIds] = useState<Set<string>>(new Set());
  const [isHowToPlayVisible, setIsHowToPlayVisible] = useState<boolean>(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  // Screen Navigation
  const navigate = useCallback((targetScreen: ScreenType) => {
    setScreen(targetScreen);
  }, []);

  // Player Management
  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setPlayers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: trimmed,
        avatarEmoji: getRandomAvatarEmoji(prev.length),
        score: 0,
        truthsCompleted: 0,
        daresCompleted: 0,
        specialCompleted: 0,
        skipped: 0,
      },
    ]);
  }, []);

  const removePlayer = useCallback((id: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Category Selection
  const toggleCategory = useCallback((categoryId: CategoryType) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        if (prev.length === 1) return prev; // Keep at least 1 category selected
        return prev.filter((c) => c !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  }, []);

  // Start Next Round Flow
  const triggerNextRound = useCallback(() => {
    if (players.length < 2) return;

    const previousTargetId = currentRound?.targetPlayer.id;
    const { target, challenger } = selectTargetAndChallenger(players, previousTargetId);

    const isSpecial = currentRoundNumber > 1 && currentRoundNumber % 4 === 0;

    let specialPrompt: SpecialPrompt | undefined;
    if (isSpecial) {
      const idx = (Math.floor(currentRoundNumber / 4) - 1) % SPECIAL_PROMPTS.length;
      specialPrompt = SPECIAL_PROMPTS[idx];
    }

    const newRound: Round = {
      id: `round_${currentRoundNumber}_${Date.now()}`,
      roundNumber: currentRoundNumber,
      targetPlayer: target,
      challengerPlayer: challenger,
      isSpecial,
      specialType: specialPrompt?.type,
      prompt: specialPrompt,
    };

    setCurrentRound(newRound);
    navigate('player_roulette');
  }, [players, currentRoundNumber, currentRound, navigate]);

  // Player Chooses Truth or Dare
  const selectChoice = useCallback(
    (choice: PromptType) => {
      if (!currentRound) return;

      // Filter unused prompts matching selected categories and choice
      let candidates = PROMPTS.filter(
        (p) => p.type === choice && selectedCategories.includes(p.categoryId) && !usedPromptIds.has(p.id)
      );

      // Reset pool if all prompts in chosen categories have been used
      if (candidates.length === 0) {
        candidates = PROMPTS.filter((p) => p.type === choice && selectedCategories.includes(p.categoryId));
      }

      const selectedPrompt =
        candidates[Math.floor(Math.random() * candidates.length)] || {
          id: `fallback_${Date.now()}`,
          categoryId: selectedCategories[0] || 'friends',
          type: choice,
          text: choice === 'truth' ? 'What is your biggest secret?' : 'Do 10 jumping jacks right now!',
        };

      setUsedPromptIds((prev) => new Set(prev).add(selectedPrompt.id));

      setCurrentRound((prev) => (prev ? { ...prev, choice, prompt: selectedPrompt } : null));
      navigate('question');
    },
    [currentRound, selectedCategories, usedPromptIds, navigate]
  );

  // Complete or Skip Current Round
  const resolveRound = useCallback(
    (isDone: boolean) => {
      if (!currentRound) return;

      const targetId = currentRound.targetPlayer.id;
      let pointsEarned = 0;

      if (isDone) {
        if (currentRound.isSpecial) {
          pointsEarned = SCORE_VALUES.SPECIAL;
        } else if (currentRound.choice === 'truth') {
          pointsEarned = SCORE_VALUES.TRUTH;
        } else if (currentRound.choice === 'dare') {
          pointsEarned = SCORE_VALUES.DARE;
        }
      } else {
        pointsEarned = SCORE_VALUES.SKIP;
      }

      // Update Player stats
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === targetId) {
            return {
              ...p,
              score: p.score + pointsEarned,
              truthsCompleted: isDone && currentRound.choice === 'truth' ? p.truthsCompleted + 1 : p.truthsCompleted,
              daresCompleted: isDone && currentRound.choice === 'dare' ? p.daresCompleted + 1 : p.daresCompleted,
              specialCompleted: isDone && currentRound.isSpecial ? p.specialCompleted + 1 : p.specialCompleted,
              skipped: !isDone ? p.skipped + 1 : p.skipped,
            };
          }
          return p;
        })
      );

      const completedRound: Round = {
        ...currentRound,
        pointsEarned,
        skipped: !isDone,
      };

      setRoundsHistory((prev) => [...prev, completedRound]);
      setCurrentRoundNumber((prev) => prev + 1);

      // Trigger next round immediately
      const nextRoundNum = currentRoundNumber + 1;
      const previousTargetId = currentRound.targetPlayer.id;
      const { target, challenger } = selectTargetAndChallenger(players, previousTargetId);
      const isNextSpecial = nextRoundNum > 1 && nextRoundNum % 4 === 0;

      let specialPrompt: SpecialPrompt | undefined;
      if (isNextSpecial) {
        const idx = (Math.floor(nextRoundNum / 4) - 1) % SPECIAL_PROMPTS.length;
        specialPrompt = SPECIAL_PROMPTS[idx];
      }

      const nextRound: Round = {
        id: `round_${nextRoundNum}_${Date.now()}`,
        roundNumber: nextRoundNum,
        targetPlayer: target,
        challengerPlayer: challenger,
        isSpecial: isNextSpecial,
        specialType: specialPrompt?.type,
        prompt: specialPrompt,
      };

      setCurrentRound(nextRound);
      navigate('player_roulette');
    },
    [currentRound, currentRoundNumber, players, navigate]
  );

  // Finish Game & Go to Summary
  const finishGame = useCallback(() => {
    navigate('summary');
  }, [navigate]);

  // Reset Game completely
  const resetGame = useCallback(() => {
    setCurrentRoundNumber(1);
    setCurrentRound(null);
    setRoundsHistory([]);
    setUsedPromptIds(new Set());
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        score: 0,
        truthsCompleted: 0,
        daresCompleted: 0,
        specialCompleted: 0,
        skipped: 0,
      }))
    );
    navigate('home');
  }, [navigate]);

  return {
    screen,
    navigate,
    players,
    addPlayer,
    removePlayer,
    selectedCategories,
    toggleCategory,
    currentRoundNumber,
    currentRound,
    roundsHistory,
    triggerNextRound,
    selectChoice,
    resolveRound,
    finishGame,
    resetGame,
    isHowToPlayVisible,
    setIsHowToPlayVisible,
    isSettingsVisible,
    setIsSettingsVisible,
  };
};
