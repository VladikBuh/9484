import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClimateMode } from '../../types';
import { useClimate } from '../../context/ClimateContext';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

const MODES: { mode: ClimateMode; emoji: string }[] = [
  { mode: 'Cool', emoji: '❄️' },
  { mode: 'Heat', emoji: '🔥' },
  { mode: 'Fan', emoji: '💨' },
  { mode: 'Auto', emoji: '🔄' },
];

export function TemperatureControl() {
  const { settings, setTemp } = useClimate();
  return (
    <View style={styles.TempControlChassis}>
      <TouchableOpacity
        style={styles.TempControlBtn}
        onPress={() => setTemp(settings.temperature - 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.TempControlBtnText}>−</Text>
      </TouchableOpacity>
      <View style={styles.TempControlDisplay}>
        <Text style={styles.TempControlValue}>{settings.temperature}°</Text>
        <Text style={styles.TempControlUnit}>Celsius</Text>
      </View>
      <TouchableOpacity
        style={styles.TempControlBtn}
        onPress={() => setTemp(settings.temperature + 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.TempControlBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export function ModeSelector() {
  const { settings, setMode } = useClimate();
  return (
    <View style={styles.ModeSelectorChassis}>
      {MODES.map(({ mode, emoji }) => {
        const active = settings.mode === mode;
        return (
          <TouchableOpacity
            key={mode}
            style={[
              styles.ModeSelectorChip,
              active && styles.ModeSelectorChipActive,
            ]}
            onPress={() => setMode(mode)}
            activeOpacity={0.75}
          >
            <Text style={styles.ModeSelectorEmoji}>{emoji}</Text>
            <Text
              style={[
                styles.ModeSelectorLabel,
                active && styles.ModeSelectorLabelActive,
              ]}
            >
              {mode}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TempControlChassis: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxl,
    paddingVertical: spacing.xxl,
  },

  TempControlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.elevatedCard,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TempControlBtnText: {
    fontSize: 24,
    color: colors.primaryGold,
    lineHeight: 28,
  },
  TempControlDisplay: { alignItems: 'center' },
  TempControlValue: {
    fontSize: 56,
    fontWeight: '200',
    color: colors.textPrimary,
    lineHeight: 64,
  },

  TempControlUnit: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  ModeSelectorChassis: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  ModeSelectorChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.m,
    borderRadius: radius.card,
    backgroundColor: colors.elevatedCard,
    borderWidth: 1,
    borderColor: colors.divider,
    gap: 6,
  },

  ModeSelectorChipActive: {
    backgroundColor: colors.primaryGold,
    borderColor: colors.primaryGold,
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ModeSelectorEmoji: { fontSize: 26 },
  ModeSelectorLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  ModeSelectorLabelActive: {
    color: colors.background,
  },
});
