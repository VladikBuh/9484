import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../constants/theme';
import { PrimaryButton } from '../buttons/PrimaryButton';

interface ConfirmModalProps {
  visible: boolean;
  icon: string;
  title: string;
  message: string;
  onClose: () => void;
}

export function ConfirmModal({
  visible,
  icon,
  title,
  message,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.ConfirmModalBackdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={styles.ConfirmModalSheet}
          onStartShouldSetResponder={() => true}
        >
          <Text style={styles.ConfirmModalIcon}>{icon}</Text>
          <Text style={styles.ConfirmModalTitle}>{title}</Text>
          <Text style={styles.ConfirmModalMessage}>{message}</Text>
          <PrimaryButton
            label="Done"
            onPress={onClose}
            style={styles.ConfirmModalBtn}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  ConfirmModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  ConfirmModalSheet: {
    backgroundColor: colors.darkCard,
    borderRadius: radius.large,
    borderWidth: 1,
    borderColor: `${colors.primaryGold}40`,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },

  ConfirmModalIcon: {
    fontSize: 48,
    marginBottom: spacing.m,
  },
  ConfirmModalTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.s,
    textAlign: 'center',
  },

  ConfirmModalMessage: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xxl,
  },
  ConfirmModalBtn: {
    width: '100%',
  },
});
