import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Header } from '../components/common/Header';
import { GradientButton } from '../components/common/GradientButton';
import { PlayerListItem } from '../components/game/PlayerListItem';
import { Player } from '../types/game';
import * as Haptics from 'expo-haptics';

interface PlayersScreenProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onContinue: () => void;
}

export const PlayersScreen: React.FC<PlayersScreenProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onContinue,
}) => {
  const [inputName, setInputName] = useState<string>('');

  const handleAdd = () => {
    if (!inputName.trim()) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    onAddPlayer(inputName);
    setInputName('');
  };

  const isReady = players.length >= 2;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Header title="Who's playing?" subtitle="Add at least 2 friends to spark the madness" />

        {/* Input Row */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter player name..."
            placeholderTextColor="#6C5F8D"
            value={inputName}
            onChangeText={setInputName}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
          />
          <TouchableOpacity activeOpacity={0.8} onPress={handleAdd} style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD +</Text>
          </TouchableOpacity>
        </View>

        {/* Player List */}
        <View style={styles.listContainer}>
          {players.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>👥</Text>
              <Text style={styles.emptyTitle}>No players added yet</Text>
              <Text style={styles.emptySubtitle}>Type a player's name above and press ADD +</Text>
            </View>
          ) : (
            players.map((player) => (
              <PlayerListItem
                key={player.id}
                player={player}
                onRemove={onRemovePlayer}
                canRemove={true}
              />
            ))
          )}
        </View>

        {/* Player Counter Indicator */}
        <View style={styles.counterRow}>
          <Text style={styles.counterEmoji}>{isReady ? '✅' : '⚠️'}</Text>
          <Text style={[styles.counterText, !isReady && styles.counterTextWarning]}>
            {isReady
              ? `${players.length} players ready to rumble`
              : `Add at least ${2 - players.length} more player${2 - players.length > 1 ? 's' : ''} to start`}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footerContainer}>
        <GradientButton
          title="LET'S PLAY ⚡"
          onPress={onContinue}
          disabled={!isReady}
        />
      </View>
    </KeyboardAvoidingView>
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
  inputContainer: {
    width: '100%',
    height: 56,
    backgroundColor: '#17102B',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#A855F7',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  listContainer: {
    width: '100%',
    marginBottom: 16,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  counterEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  counterText: {
    color: '#00E676',
    fontSize: 15,
    fontWeight: '700',
  },
  counterTextWarning: {
    color: '#FFE600',
  },
  emptyContainer: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(23, 16, 43, 0.6)',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderStyle: 'dashed',
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9D8EC4',
    textAlign: 'center',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
});
