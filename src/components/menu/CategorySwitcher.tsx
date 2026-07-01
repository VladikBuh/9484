import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MenuCategory } from '../../types';
import { menuCategories } from '../../data/menu';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

interface CategorySwitcherProps {
  selected: MenuCategory;
  onSelect: (c: MenuCategory) => void;
}

export function CategorySwitcher({
  selected,
  onSelect,
}: CategorySwitcherProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.CategorySwitcherWrapper}
      contentContainerStyle={styles.CategorySwitcherScroll}
    >
      {menuCategories.map(cat => {
        const active = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat as MenuCategory)}
            activeOpacity={0.75}
            style={[
              styles.CategorySwitcherChip,
              active && styles.CategorySwitcherChipActive,
            ]}
          >
            <Text
              style={[
                styles.CategorySwitcherLabel,
                active && styles.CategorySwitcherLabelActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  CategorySwitcherWrapper: {
    flexShrink: 0,
  },
  CategorySwitcherScroll: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 6,
    gap: 10,
  },

  CategorySwitcherChip: {
    paddingHorizontal: 18,
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.elevatedCard,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  CategorySwitcherChipActive: {
    backgroundColor: colors.primaryGold,
    borderColor: colors.primaryGold,
  },
  CategorySwitcherLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  CategorySwitcherLabelActive: {
    color: colors.background,
  },
});
