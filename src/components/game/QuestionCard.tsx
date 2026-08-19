import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../../data/categories';
import { Prompt, PromptType } from '../../types/game';

interface QuestionCardProps {
  prompt: Prompt;
  choice: PromptType;
  challengerName: string;
  targetName: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  prompt,
  choice,
  challengerName,
  targetName,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const category = CATEGORIES.find((c) => c.id === prompt.categoryId);
  const categoryTitle = category ? `${category.title} ${category.emoji}` : 'General';

  const formatTime = (secs: number) => {
    const s = secs < 10 ? `0${secs}` : `${secs}`;
    return `0:${s}`;
  };

  return (
    <View style={styles.container}>
      {/* Target & Challenger Banner */}
      <View style={styles.playerHeaderPill}>
        <Text style={styles.challengerText}>{challengerName.toUpperCase()}</Text>
        <Text style={styles.arrowText}> ➔ </Text>
        <Text style={styles.targetText}>{targetName.toUpperCase()}</Text>
      </View>

      {/* Main Question Card Container */}
      <View style={styles.card}>
        {/* Category & Type Tag */}
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>
            {choice.toUpperCase()} · {categoryTitle}
          </Text>
        </View>

        {/* Prompt Content */}
        <Text style={styles.promptText}>{prompt.text}</Text>

        {/* Live Timer */}
        <View style={styles.timerRow}>
          <Text style={styles.timerIcon}>⏱️</Text>
          <Text style={styles.timerText}>{formatTime(secondsLeft)} Left</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  playerHeaderPill: {
    backgroundColor: '#17102B',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  challengerText: {
    color: '#FF6B00',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  arrowText: {
    color: '#FF00A8',
    fontWeight: '900',
    fontSize: 16,
    marginHorizontal: 6,
  },
  targetText: {
    color: '#00F2FE',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  card: {
    width: '100%',
    minHeight: 320,
    backgroundColor: '#130C24',
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#7F00FF',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#7F00FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  tagPill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFE600',
    backgroundColor: 'rgba(255, 230, 0, 0.1)',
  },
  tagText: {
    color: '#FFE600',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  promptText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
    marginVertical: 24,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  timerText: {
    color: '#FF00A8',
    fontSize: 16,
    fontWeight: '700',
  },
});
