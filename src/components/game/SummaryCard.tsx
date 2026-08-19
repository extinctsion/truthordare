import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PlayerAward } from '../../types/game';

interface SummaryCardProps {
  roundsPlayed: number;
  daresNailed: number;
  awards: PlayerAward[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  roundsPlayed,
  daresNailed,
  awards,
}) => {
  return (
    <View style={styles.container}>
      {/* Stat Card */}
      <View style={styles.statCard}>
        <View style={styles.statCol}>
          <Text style={[styles.statNumber, { color: '#FF00A8' }]}>{roundsPlayed}</Text>
          <Text style={styles.statLabel}>Rounds Played</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={[styles.statNumber, { color: '#FF6B00' }]}>{daresNailed}</Text>
          <Text style={styles.statLabel}>Dares Nailed</Text>
        </View>
      </View>

      {/* Awards Section */}
      <View style={styles.awardsList}>
        {awards.map((award) => (
          <View key={award.id} style={styles.awardRow}>
            <Text style={styles.awardTitle}>
              {award.title} {award.emoji}
            </Text>
            <View style={[styles.playerBadge, { backgroundColor: award.pillColor }]}>
              <Text style={[styles.playerBadgeText, award.pillTextColor ? { color: award.pillTextColor } : null]}>
                {award.playerName}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  statCard: {
    width: '100%',
    backgroundColor: '#17102B',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#9D8EC4',
    fontWeight: '600',
  },
  awardsList: {
    width: '100%',
    gap: 12,
  },
  awardRow: {
    width: '100%',
    backgroundColor: '#17102B',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  awardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  playerBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  playerBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
});
