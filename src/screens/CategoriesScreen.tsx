import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/common/Header';
import { GradientButton } from '../components/common/GradientButton';
import { CategoryCard } from '../components/game/CategoryCard';
import { CATEGORIES } from '../data/categories';
import { CategoryType } from '../types/game';

interface CategoriesScreenProps {
  selectedCategories: CategoryType[];
  onToggleCategory: (categoryId: CategoryType) => void;
  onContinue: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  selectedCategories,
  onToggleCategory,
  onContinue,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header
          title="Pick your vibe"
          subtitle="Choose multiple vibes to blend the chaos"
        />

        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isSelected={selectedCategories.includes(cat.id)}
            onToggle={() => onToggleCategory(cat.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footerContainer}>
        <GradientButton title="CONTINUE ➔" onPress={onContinue} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
});
