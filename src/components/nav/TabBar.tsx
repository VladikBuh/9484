import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GuestTab } from '../../navigation/types';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { useMenu } from '../../context/MenuContext';
import { colors, fontSize, layout } from '../../constants/theme';

interface Tab {
  tab: GuestTab;
  emoji: string;
  label: string;
}

const TABS: Tab[] = [
  { tab: 'HomeTab', emoji: '🏠', label: 'Home' },
  { tab: 'RequestsTab', emoji: '🛎', label: 'Requests' },
  { tab: 'MenuTab', emoji: '🍽', label: 'Menu' },
  { tab: 'ExploreTab', emoji: '🗺', label: 'Explore' },
  { tab: 'ClimateTab', emoji: '❄️', label: 'Climate' },
];

export function TabBar() {
  const { activeTab, switchTab } = useAppNavigation();
  const { cartCount } = useMenu();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.TabBarChassis, { paddingBottom: insets.bottom || 12 }]}
    >
      <View style={styles.TabBarRow}>
        {TABS.map(({ tab, emoji, label }) => {
          const active = activeTab === tab;
          const showBadge = tab === 'MenuTab' && cartCount > 0;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.TabBarItem}
              onPress={() => switchTab(tab)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.TabBarIconWrap,
                  active && styles.TabBarIconWrapActive,
                ]}
              >
                <Text style={styles.TabBarEmoji}>{emoji}</Text>
                {showBadge && (
                  <View style={styles.TabBarBadge}>
                    <Text style={styles.TabBarBadgeText}>
                      {cartCount > 9 ? '9+' : cartCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[styles.TabBarLabel, active && styles.TabBarLabelActive]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TabBarChassis: {
    backgroundColor: colors.elevatedCard,
    paddingTop: 10,
    paddingHorizontal: 8,
    borderTopColor: colors.primaryGold,
    borderTopWidth: 0.3,
  },

  TabBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TabBarItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
    borderRadius: 20,
  },
  TabBarIconWrap: {
    width: 44,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  TabBarIconWrapActive: {
    backgroundColor: `${colors.primaryGold}22`,
    ...(Platform.OS === 'android' && { borderRadius: 20 }),
  },
  TabBarEmoji: {
    fontSize: 20,
  },

  TabBarLabel: {
    fontSize: fontSize.caption,
    color: colors.mutedText,
    marginTop: 3,
    fontWeight: '400',
  },
  TabBarLabelActive: {
    color: colors.primaryGold,
    fontWeight: '600',
  },
  TabBarBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primaryGold,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  TabBarBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.background,
  },
});
