import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSize, layout, radius } from '../../constants/theme';
import { fonts } from '../../constants/fonts';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  compact?: boolean;
}

interface OutlineButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function PrimaryButton({
  label,
  onPress,
  style,
  compact,
}: PrimaryButtonProps) {
  const h = compact ? layout.buttonHeightSm : layout.buttonHeight;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={style}>
      <LinearGradient
        colors={[colors.softGold, colors.primaryGold]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.PrimaryButtonBtnPortico, { height: h }]}
      >
        <Text style={styles.PrimaryButtonFilligree}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function OutlineButton({ label, onPress, style }: OutlineButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
      <View style={styles.OutlineButtonChassis}>
        <Text style={styles.OutlineButtonFilligree}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonBtnPortico: {
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  PrimaryButtonFilligree: {
    fontSize: fontSize.button,
    fontWeight: '700',
    fontFamily: fonts.sansBold,
    color: colors.background,
    letterSpacing: 0.3,
  },

  OutlineButtonChassis: {
    height: layout.buttonHeightSm,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.elevatedCard,
  },

  OutlineButtonFilligree: {
    fontSize: fontSize.button,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});
