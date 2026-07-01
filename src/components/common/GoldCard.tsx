import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {colors, radius} from '../../constants/theme';

interface GoldCardProps {
  children: React.ReactNode;
  style?:   ViewStyle;
  glow?:    boolean;
}

export function GoldCard({children, style, glow}: GoldCardProps) {
  return (
    <View style={[styles.GoldCardChassis, glow && styles.GoldCardGlow, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  GoldCardChassis: {
    backgroundColor: colors.darkCard,
    borderRadius:    radius.card,
    borderWidth:     1,
    borderColor:     `${colors.primaryGold}30`,
    overflow:        'hidden',
  },
  GoldCardGlow: {
    shadowColor:   colors.primaryGold,
    shadowOffset:  {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius:  12,
    elevation:     4,
  },
});
