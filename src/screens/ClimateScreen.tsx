import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TemperatureControl,
  ModeSelector,
} from '../components/climate/ClimateControls';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { GoldCard } from '../components/common/GoldCard';

import { useClimate } from '../context/ClimateContext';

import { colors, fontSize, layout, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

export function ClimateScreen() {
  const insets = useSafeAreaInsets();
  const { scale } = useAdaptive();
  const { settings, setOnTimer, setOffTimer, applySettings } = useClimate();
  const [confirmed, setConfirmed] = useState(false);

  const handleApply = () => {
    applySettings();
    setConfirmed(true);
  };

  return (
    <ScrollView
      style={styles.ClimateScreenChassis}
      contentContainerStyle={[
        styles.ClimateScreenScroll,
        {
          paddingTop: insets.top + spacing.l,
          paddingBottom: layout.tabBarHeight + spacing.xl,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.ClimateScreenHeader}>
        <Text style={styles.ClimateScreenTitle}>Climate Control</Text>
        <Text style={styles.ClimateScreenSubtitle}>
          Suite 512 · Comfort settings
        </Text>
      </View>

      <GoldCard glow style={styles.ClimateScreenModeDisplay}>
        <Text style={[styles.ClimateScreenModeEmoji, { fontSize: scale(48) }]}>
          {settings.mode === 'Cool'
            ? '❄️'
            : settings.mode === 'Heat'
            ? '🔥'
            : settings.mode === 'Fan'
            ? '💨'
            : '🔄'}
        </Text>
        <Text style={[styles.ClimateScreenCurrentTemp, { fontSize: scale(60), lineHeight: scale(68) }]}>
          {settings.temperature}°C
        </Text>
        <Text style={styles.ClimateScreenCurrentMode}>
          Current setting — {settings.mode} mode
        </Text>
      </GoldCard>

      <Text style={styles.ClimateScreenSectionTitle}>Desired Temperature</Text>
      <GoldCard style={styles.ClimateScreenTempCard}>
        <TemperatureControl />
      </GoldCard>

      <Text style={styles.ClimateScreenSectionTitle}>Climate Mode</Text>
      <ModeSelector />

      <Text style={styles.ClimateScreenSectionTitle}>Timers</Text>
      <GoldCard style={styles.ClimateScreenTimerCard}>
        <View style={styles.ClimateScreenTimerRow}>
          <View style={styles.ClimateScreenTimerInfo}>
            <Text style={styles.ClimateScreenTimerLabel}>⏰ Turn On</Text>
          </View>
          <Switch
            value={settings.onTimerEnabled}
            onValueChange={v => setOnTimer(v)}
            trackColor={{ false: colors.divider, true: colors.primaryGold }}
            thumbColor={colors.textPrimary}
          />
        </View>
        {settings.onTimerEnabled && (
          <TextInput
            style={styles.ClimateScreenTimeInput}
            value={settings.onTime}
            onChangeText={t => setOnTimer(true, t)}
            placeholder="HH:MM"
            placeholderTextColor={colors.mutedText}
            keyboardType="numbers-and-punctuation"
          />
        )}

        <View style={styles.ClimateScreenTimerDivider} />

        <View style={styles.ClimateScreenTimerRow}>
          <View style={styles.ClimateScreenTimerInfo}>
            <Text style={styles.ClimateScreenTimerLabel}>🌙 Turn Off</Text>
          </View>
          <Switch
            value={settings.offTimerEnabled}
            onValueChange={v => setOffTimer(v)}
            trackColor={{ false: colors.divider, true: colors.primaryGold }}
            thumbColor={colors.textPrimary}
          />
        </View>
        {settings.offTimerEnabled && (
          <TextInput
            style={styles.ClimateScreenTimeInput}
            value={settings.offTime}
            onChangeText={t => setOffTimer(true, t)}
            placeholder="HH:MM"
            placeholderTextColor={colors.mutedText}
            keyboardType="numbers-and-punctuation"
          />
        )}
      </GoldCard>

      <PrimaryButton label="Apply Climate Settings" onPress={handleApply} />

      <ConfirmModal
        visible={confirmed}
        icon="✅"
        title="Settings Updated"
        message="Climate settings have been updated. Your room will reach the desired temperature shortly."
        onClose={() => setConfirmed(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ClimateScreenChassis: { flex: 1, backgroundColor: colors.background },
  ClimateScreenScroll: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.l,
  },
  ClimateScreenHeader: { gap: 4 },
  ClimateScreenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  ClimateScreenSubtitle: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },

  ClimateScreenModeDisplay: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.s,
  },
  ClimateScreenModeEmoji: { fontSize: 48 },
  ClimateScreenCurrentTemp: {
    fontSize: 60,
    fontWeight: '100',
    color: colors.textPrimary,
    lineHeight: 68,
  },
  ClimateScreenCurrentMode: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  ClimateScreenSectionTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  ClimateScreenTempCard: { overflow: 'hidden' },
  ClimateScreenTimerCard: { overflow: 'hidden' },
  ClimateScreenTimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.l,
  },

  ClimateScreenTimerInfo: { flex: 1 },
  ClimateScreenTimerLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  ClimateScreenTimerDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.l,
  },

  ClimateScreenTimeInput: {
    marginHorizontal: spacing.l,
    marginBottom: spacing.m,
    backgroundColor: colors.elevatedCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.m,
    fontSize: fontSize.title,
    fontWeight: '600',
    color: colors.primaryGold,
    textAlign: 'center',
  },
});
