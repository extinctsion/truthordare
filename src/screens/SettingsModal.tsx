import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { GradientButton } from '../components/common/GradientButton';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings ⚙️</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Game Mode</Text>
            <Text style={styles.settingValue}>Completely Offline 📱</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Text style={styles.settingValue}>Enabled ⚡</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Round Timer</Text>
            <Text style={styles.settingValue}>30 Seconds ⏱️</Text>
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>v1.0.0 (Expo SDK 54)</Text>
          </View>

          <GradientButton title="CLOSE ✖️" onPress={onClose} style={styles.closeBtn} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    backgroundColor: '#17102B',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#7F00FF',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#E2D9F3',
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00F2FE',
  },
  closeBtn: {
    marginTop: 24,
  },
});
