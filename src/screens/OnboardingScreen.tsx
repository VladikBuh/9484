import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { images } from '../assets';
import { onboardingData } from '../data/onboarding';

import { useAppNavigation } from '../navigation/NavigationContext';
import { PaginationDots } from '../components/nav/PaginationDots';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { colors, fontSize, layout, spacing } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdaptive } from '../hooks/useAdaptive';

export function OnboardingScreen() {
  const { goToMain } = useAppNavigation();
  const [page, setPage] = useState(0);
  const insets = useSafeAreaInsets();
  const { scale } = useAdaptive();
  const isLast = page === onboardingData.length - 1;
  const current = onboardingData[page];
  const bgImg = images[current.bgImage as keyof typeof images];

  const goNext = () => {
    if (isLast) {
      goToMain();
    } else {
      setPage(p => p + 1);
    }
  };

  return (
    <ImageBackground
      source={bgImg}
      style={styles.OnboardingScreenChassis}
      resizeMode="cover"
    >
      <View
        style={[
          styles.OnboardingScreenSkipRow,
          { paddingTop: insets.top + 16 },
        ]}
      >
        <View />
        {!isLast && (
          <TouchableOpacity onPress={goToMain} activeOpacity={0.75}>
            <Text style={styles.OnboardingScreenSkipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.OnboardingScreenIllustration}>
        <View style={[styles.OnboardingScreenIllustrationRing, { width: scale(180), height: scale(180), borderRadius: scale(90) }]}>
          <Text style={[styles.OnboardingScreenEmoji, { fontSize: scale(72) }]}>{current.emoji}</Text>
        </View>
      </View>

      <View style={styles.OnboardingScreenContent}>
        <Text style={styles.OnboardingScreenTitle}>{current.title}</Text>
        <Text style={styles.OnboardingScreenSubtitle}>{current.subtitle}</Text>
      </View>

      <View
        style={[
          styles.OnboardingScreenBottom,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        <PaginationDots total={onboardingData.length} current={page} />
        <PrimaryButton
          label={isLast ? 'Enter App' : 'Next'}
          onPress={goNext}
          style={styles.OnboardingScreenBtn}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenChassis: { flex: 1 },

  OnboardingScreenOverlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.background}55`,
  },
  OnboardingScreenOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: `${colors.background}E0`,
  },
  OnboardingScreenSkipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.xl,
  },

  OnboardingScreenSkipText: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  OnboardingScreenIllustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  OnboardingScreenIllustrationRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: `${colors.primaryGold}40`,
    backgroundColor: `${colors.primaryGold}10`,
    alignItems: 'center',
    justifyContent: 'center',
  },

  OnboardingScreenEmoji: { fontSize: 72 },
  OnboardingScreenContent: {
    paddingHorizontal: layout.screenPadding,
    alignItems: 'center',
    gap: spacing.m,
  },
  OnboardingScreenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 34,
  },

  OnboardingScreenSubtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  OnboardingScreenBottom: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.xxl,
    alignItems: 'center',
    paddingTop: spacing.xxxl,
  },
  OnboardingScreenBtn: { width: '100%' },
});
