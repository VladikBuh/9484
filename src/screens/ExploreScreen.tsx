import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LocationCard } from '../components/explore/LocationCard';
import { locations } from '../data/locations';

import { useExplore } from '../context/ExploreContext';

import { colors, fontSize, layout, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

type ExploreTab = 'All' | 'Want to Visit';

export function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { scale, verticalScale } = useAdaptive();
  const [tab, setTab] = useState<ExploreTab>('All');
  const { isWishlisted } = useExplore();

  const displayed =
    tab === 'All' ? locations : locations.filter(l => isWishlisted(l.id));

  return (
    <View style={styles.ExploreScreenChassis}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.ExploreScreenScroll,
          { paddingTop: insets.top + spacing.l },
        ]}
      >
        <View style={styles.ExploreScreenHeader}>
          <Text style={styles.ExploreScreenTitle}>Explore</Text>
          <Text style={styles.ExploreScreenSubtitle}>
            Gdansk & surrounding area
          </Text>
        </View>

        <View style={styles.ExploreScreenTabRow}>
          {(['All', 'Want to Visit'] as ExploreTab[]).map(t => (
            <TouchableOpacity
              key={t}
              style={styles.ExploreScreenTabItem}
              onPress={() => setTab(t)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.ExploreScreenTabLabel,
                  tab === t && styles.ExploreScreenTabLabelActive,
                ]}
              >
                {t}
              </Text>
              <View
                style={[
                  styles.ExploreScreenTabUnderline,
                  tab === t && styles.ExploreScreenTabUnderlineActive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {displayed.length === 0 ? (
          <View style={[styles.ExploreScreenEmpty, { paddingTop: verticalScale(60) }]}>
            <Text style={[styles.ExploreScreenEmptyEmoji, { fontSize: scale(48) }]}>🔖</Text>
            <Text style={styles.ExploreScreenEmptyTitle}>
              No saved places yet
            </Text>
            <Text style={styles.ExploreScreenEmptyDesc}>
              Tap the bookmark icon on any attraction to save it for later.
            </Text>
          </View>
        ) : (
          displayed.map(loc => <LocationCard key={loc.id} location={loc} />)
        )}

        <View style={{ height: layout.tabBarHeight + spacing.l }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ExploreScreenChassis: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ExploreScreenScroll: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.l,
  },

  ExploreScreenHeader: {
    gap: 4,
  },
  ExploreScreenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  ExploreScreenSubtitle: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  ExploreScreenTabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },

  ExploreScreenTabItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: spacing.s,
  },
  ExploreScreenTabLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.mutedText,
    paddingBottom: spacing.s,
  },
  ExploreScreenTabLabelActive: { color: colors.primaryGold },
  ExploreScreenTabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'transparent',
  },
  ExploreScreenTabUnderlineActive: {
    backgroundColor: colors.primaryGold,
  },

  ExploreScreenEmpty: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
    gap: spacing.m,
  },
  ExploreScreenEmptyEmoji: { fontSize: 48 },
  ExploreScreenEmptyTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: '700',
    color: colors.textSecondary,
    textAlign: 'center',
  },

  ExploreScreenEmptyDesc: {
    fontSize: fontSize.body,
    color: colors.mutedText,
    textAlign: 'center',
    lineHeight: 20,
  },
});
