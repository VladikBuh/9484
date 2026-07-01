import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategorySwitcher } from '../components/menu/CategorySwitcher';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { menuItems } from '../data/menu';
import { useMenu } from '../context/MenuContext';

import { useAppNavigation } from '../navigation/NavigationContext';

import { colors, fontSize, layout, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

export function MenuScreen() {
  const insets = useSafeAreaInsets();
  const { scale } = useAdaptive();
  const { category, setCategory, cartCount } = useMenu();
  const { pushOverlay } = useAppNavigation();

  const filtered = menuItems.filter(i => i.category === category);

  return (
    <View style={styles.MenuScreenChassis}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.MenuScreenScroll,
          { paddingTop: insets.top + spacing.l },
        ]}
      >
        <View style={styles.MenuScreenHeader}>
          <View>
            <Text style={styles.MenuScreenTitle}>Restaurant</Text>
            <Text style={styles.MenuScreenSubtitle}>Dining experience</Text>
          </View>
          <TouchableOpacity
            style={[styles.MenuScreenCartBtn, { width: scale(46), height: scale(46), borderRadius: scale(23) }]}
            onPress={() => pushOverlay({ type: 'Cart' })}
            activeOpacity={0.8}
          >
            <Text style={styles.MenuScreenCartEmoji}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.MenuScreenCartBadge}>
                <Text style={styles.MenuScreenCartBadgeText}>
                  {cartCount > 9 ? '9+' : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.MenuScreenCategoryWrap}>
          <CategorySwitcher selected={category} onSelect={setCategory} />
        </View>

        <View style={styles.MenuScreenDivider} />

        {filtered.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}

        <View style={{ height: layout.tabBarHeight + spacing.l }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  MenuScreenChassis: {
    flex: 1,
    backgroundColor: colors.background,
  },

  MenuScreenScroll: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.l,
  },
  MenuScreenHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  MenuScreenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  MenuScreenSubtitle: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  MenuScreenCartBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.elevatedCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  MenuScreenCartEmoji: { fontSize: 22 },
  MenuScreenCartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.primaryGold,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  MenuScreenCartBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.background,
  },
  MenuScreenCategoryWrap: {
    marginHorizontal: -layout.screenPadding,
  },

  MenuScreenDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginTop: -spacing.s,
  },
});
