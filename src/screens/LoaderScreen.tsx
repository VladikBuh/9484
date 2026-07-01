import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { images } from '../assets';
import { colors, fontSize, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

export function LoaderScreen() {
  const { scale, verticalScale, loaderLogoSize } = useAdaptive();
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 4800,
        delay: 200,
        useNativeDriver: false,
      }),
    ]).start();
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={images.loaderBg}
      style={styles.LoaderScreenChassis}
      resizeMode="cover"
    >
      <Image
        source={images.loaderIcon}
        style={[styles.LoaderScreenIcon, { width: 280, height: 280 }]}
        resizeMode="contain"
      />

      <Animated.View
        style={{ opacity, alignItems: 'center', marginTop: spacing.xxl }}
      >
        <Text style={styles.LoaderScreenTitle}>TOTAL CASINO</Text>
        <Text style={styles.LoaderScreenSubtitle}>HOTEL & RESORT</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.LoaderScreenProgressWrap,
          { opacity, bottom: verticalScale(80) },
        ]}
      >
        <View style={[styles.LoaderScreenProgressTrack, { width: scale(160) }]}>
          <Animated.View
            style={[styles.LoaderScreenProgressBar, { width: barWidth }]}
          />
        </View>
        <Text style={styles.LoaderScreenProgressLabel}>
          Loading your experience...
        </Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  LoaderScreenChassis: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoaderScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.background}B8`,
  },
  LoaderScreenGlowBlue: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${colors.royalBlue}30`,
    top: -60,
    alignSelf: 'center',
  },

  LoaderScreenGlowGold: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: `${colors.primaryGold}18`,
    bottom: 80,
    alignSelf: 'center',
  },

  LoaderScreenLogo: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoaderScreenRingOuter: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1.5,
    borderColor: colors.primaryGold,
    opacity: 0.7,
  },

  LoaderScreenRingInner: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: `${colors.royalBlue}88`,
  },
  LoaderScreenIcon: {
    width: 290,
    height: 290,
  },
  LoaderScreenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.champagne,
    letterSpacing: 4,
  },

  LoaderScreenSubtitle: {
    fontSize: 10,
    color: colors.mutedText,
    letterSpacing: 5,
    marginTop: 4,
  },
  LoaderScreenProgressWrap: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    gap: 10,
  },
  LoaderScreenProgressTrack: {
    width: 160,
    height: 2,
    backgroundColor: colors.divider,
    borderRadius: 1,
    overflow: 'hidden',
  },

  LoaderScreenProgressBar: {
    height: 2,
    backgroundColor: colors.primaryGold,
    borderRadius: 1,
  },
  LoaderScreenProgressLabel: {
    fontSize: fontSize.caption,
    color: colors.mutedText,
  },
});
