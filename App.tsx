import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useGameState } from './src/hooks/useGameState';
import { HomeScreen } from './src/screens/HomeScreen';
import { PlayersScreen } from './src/screens/PlayersScreen';
import { CategoriesScreen } from './src/screens/CategoriesScreen';
import { PlayerRouletteScreen } from './src/screens/PlayerRouletteScreen';
import { TruthOrDareChoiceScreen } from './src/screens/TruthOrDareChoiceScreen';
import { QuestionDareScreen } from './src/screens/QuestionDareScreen';
import { SpecialRoundScreen } from './src/screens/SpecialRoundScreen';
import { GameSummaryScreen } from './src/screens/GameSummaryScreen';
import { HowToPlayModal } from './src/screens/HowToPlayModal';
import { SettingsModal } from './src/screens/SettingsModal';

export default function App() {
  const {
    screen,
    navigate,
    players,
    addPlayer,
    removePlayer,
    selectedCategories,
    toggleCategory,
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
  } = useGameState();

  // Android Back Button Handler
  useEffect(() => {
    const onBackPress = () => {
      if (screen === 'home') {
        return false; // Exit app
      } else if (screen === 'players') {
        navigate('home');
        return true;
      } else if (screen === 'categories') {
        navigate('players');
        return true;
      } else if (screen === 'summary') {
        resetGame();
        return true;
      } else {
        Alert.alert(
          'End Game?',
          'Do you want to quit the current game and view summary?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'End Game', style: 'destructive', onPress: finishGame },
          ]
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  }, [screen, navigate, resetGame, finishGame]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0716" translucent={false} />
      <View style={styles.innerContainer}>
        {screen === 'home' && (
          <HomeScreen
            onStartGame={() => navigate('players')}
            onOpenHowToPlay={() => setIsHowToPlayVisible(true)}
            onOpenSettings={() => setIsSettingsVisible(true)}
          />
        )}

        {screen === 'players' && (
          <PlayersScreen
            players={players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            onContinue={() => navigate('categories')}
          />
        )}

        {screen === 'categories' && (
          <CategoriesScreen
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            onContinue={triggerNextRound}
          />
        )}

        {screen === 'player_roulette' && currentRound && (
          <PlayerRouletteScreen
            round={currentRound}
            onReady={() => {
              if (currentRound.isSpecial) {
                navigate('special_round');
              } else {
                navigate('choice');
              }
            }}
          />
        )}

        {screen === 'choice' && currentRound && (
          <TruthOrDareChoiceScreen
            round={currentRound}
            onSelectChoice={selectChoice}
          />
        )}

        {screen === 'question' && currentRound && (
          <QuestionDareScreen
            round={currentRound}
            onComplete={(done) => resolveRound(done)}
            onEndGame={finishGame}
          />
        )}

        {screen === 'special_round' && currentRound && (
          <SpecialRoundScreen
            round={currentRound}
            onAccept={() => resolveRound(true)}
          />
        )}

        {screen === 'summary' && (
          <GameSummaryScreen
            players={players}
            roundsHistory={roundsHistory}
            onPlayAgain={resetGame}
          />
        )}
      </View>

      {/* Modals */}
      <HowToPlayModal
        visible={isHowToPlayVisible}
        onClose={() => setIsHowToPlayVisible(false)}
      />
      <SettingsModal
        visible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0716',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#0B0716',
  },
});
