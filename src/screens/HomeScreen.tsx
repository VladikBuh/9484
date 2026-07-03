import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReservationCard } from '../components/home/ReservationCard';
import { RecommendedCard } from '../components/home/RecommendedCard';
import { getDailyLocation } from '../data/locations';

import { useAppNavigation } from '../navigation/NavigationContext';

import { colors, fontSize, layout, radius, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

export function HomeScreen() {
  const { switchTab } = useAppNavigation();
  const insets = useSafeAreaInsets();
  const { scale, verticalScale } = useAdaptive();
  const recommended = getDailyLocation();

  return (
    <ScrollView
      style={styles.HomeScreenChassis}
      contentContainerStyle={[
        styles.HomeScreenScroll,
        { paddingTop: insets.top + spacing.l, paddingBottom: spacing.xxxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#1B4585', colors.royalBlue, '#0B2040', colors.midnight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.HomeScreenHero, { height: verticalScale(220) }]}
      >
        <View
          style={[
            styles.HomeScreenHeroGlow,
            {
              width: scale(160),
              height: scale(160),
              top: -scale(40),
              right: -scale(40),
            },
          ]}
        />
        <View style={styles.HomeScreenHeroInner}>
          <Text style={styles.HomeScreenHeroEmoji}>🏨</Text>
          <Text style={styles.HomeScreenHeroHotelName}>
            Total Resort Explorer
          </Text>
        </View>
        <View style={styles.HomeScreenHeroOverlay} />
        <View style={styles.HomeScreenHeroText}>
          <Text style={styles.HomeScreenHeroTitle}>Welcome to Your Stay</Text>
          <Text style={styles.HomeScreenHeroSubtitle}>
            Everything you need, right at your fingertips.
          </Text>
        </View>
      </LinearGradient>

      <ReservationCard />

      <Text style={styles.HomeScreenSectionTitle}>Quick Access</Text>
      <View style={styles.HomeScreenQuickRow}>
        <QuickBtn
          emoji="🍽"
          label={'Restaurant\nMenu'}
          onPress={() => switchTab('MenuTab')}
        />
        <QuickBtn
          emoji="❄️"
          label={'Climate\nControl'}
          onPress={() => switchTab('ClimateTab')}
        />
      </View>

      <Text style={styles.HomeScreenSectionTitle}>Recommended Today</Text>
      <RecommendedCard location={recommended} />
    </ScrollView>
  );
}

function QuickBtn({
  emoji,
  label,
  onPress,
}: {
  emoji: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.HomeScreenQuickBtn}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.HomeScreenQuickEmoji}>{emoji}</Text>
      <Text style={styles.HomeScreenQuickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  HomeScreenChassis: {
    flex: 1,
    backgroundColor: colors.background,
  },
  HomeScreenScroll: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.xl,
  },
  HomeScreenHero: {
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  HomeScreenHeroGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: `${colors.primaryGold}18`,
  },
  HomeScreenHeroInner: {
    alignItems: 'center',
    gap: spacing.s,
  },
  HomeScreenHeroEmoji: { fontSize: 56 },
  HomeScreenHeroHotelName: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },

  HomeScreenHeroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: `${colors.background}55`,
  },
  HomeScreenHeroText: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.xl,
    right: spacing.xl,
  },
  HomeScreenHeroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  HomeScreenHeroSubtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },

  HomeScreenSectionTitle: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  HomeScreenQuickRow: {
    flexDirection: 'row',
    gap: spacing.m,
    marginTop: -spacing.s,
  },
  HomeScreenQuickBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.l,
    borderRadius: radius.card,
    backgroundColor: colors.elevatedCard,
    borderWidth: 1,
    borderColor: `${colors.primaryGold}30`,
    gap: spacing.s,
  },

  HomeScreenQuickEmoji: { fontSize: 28 },
  HomeScreenQuickLabel: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
