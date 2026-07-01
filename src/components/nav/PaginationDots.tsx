import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';

interface PaginationDotsProps {
  total: number;
  current: number;
}

export function PaginationDots({ total, current }: PaginationDotsProps) {
  return (
    <View style={styles.PaginationDotsChassis}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.PaginationDotsDot,
            i === current && styles.PaginationDotsDotActive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  PaginationDotsChassis: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  PaginationDotsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.divider,
  },

  PaginationDotsDotActive: {
    width: 24,
    backgroundColor: colors.primaryGold,
  },
});
