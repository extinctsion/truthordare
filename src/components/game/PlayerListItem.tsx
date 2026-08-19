import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Player } from '../../types/game';
import * as Haptics from 'expo-haptics';

interface PlayerListItemProps {
  player: Player;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const AVATAR_BG_COLORS = ['#00F2FE', '#FF3B00', '#FF00A8', '#FFE600', '#9D4EDD', '#00E676'];

export const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, onRemove, canRemove }) => {
  const bgIndex = Math.abs(
    player.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % AVATAR_BG_COLORS.length;

  const avatarBg = AVATAR_BG_COLORS[bgIndex];

  const handleRemove = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
    onRemove(player.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
          <Text style={styles.avatarEmoji}>{player.avatarEmoji}</Text>
        </View>
        <Text style={styles.name}>{player.name}</Text>
      </View>
      {canRemove && (
        <TouchableOpacity activeOpacity={0.7} onPress={handleRemove} style={styles.removeBtn}>
          <View style={styles.removeCircle}>
            <Text style={styles.removeX}>⊗</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#17102B',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  removeBtn: {
    padding: 4,
  },
  removeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 59, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeX: {
    color: '#FF3B00',
    fontSize: 18,
    fontWeight: '700',
  },
});
