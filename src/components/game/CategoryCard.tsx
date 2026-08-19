import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../../types/game';
import * as Haptics from 'expo-haptics';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onToggle }) => {
  const handlePress = () => {
    try {
      Haptics.selectionAsync();
    } catch {}
    onToggle();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.card,
        isSelected
          ? { borderColor: category.borderAccent, borderWidth: 1.5 }
          : { borderColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1 },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {category.title} {category.emoji}
        </Text>
        <Text style={styles.subtitle}>{category.subtitle}</Text>
      </View>
      <View
        style={[
          styles.checkbox,
          isSelected
            ? { backgroundColor: category.borderAccent, borderColor: category.borderAccent }
            : { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.2)' },
        ]}
      >
        {isSelected && <Text style={styles.checkMark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#17102B',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9D8EC4',
    fontWeight: '500',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    color: '#0B0716',
    fontWeight: '900',
    fontSize: 16,
  },
});
