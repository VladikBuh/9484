import React from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { locations } from '../data/locations';
import { images } from '../assets';
import { useExplore } from '../context/ExploreContext';
import { useAppNavigation } from '../navigation/NavigationContext';
import { PrimaryButton } from '../components/buttons/PrimaryButton';

import { OutlineButton } from '../components/buttons/PrimaryButton';

import { colors, fontSize, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

interface LocationDetailScreenProps {
  locationId: number;
}

export function LocationDetailScreen({
  locationId,
}: LocationDetailScreenProps) {
  const insets = useSafeAreaInsets();
  const { verticalScale } = useAdaptive();
  const { closeOverlay } = useAppNavigation();
  const { isWishlisted, toggleWishlist } = useExplore();
  const location = locations.find(l => l.id === locationId);
  if (!location) {
    return null;
  }

  const img = images[location.image as keyof typeof images];
  const wishlisted = isWishlisted(location.id);

  const openMap = () => {
    const query = encodeURIComponent(location.name);
    const url =
      Platform.OS === 'ios' ? `maps://q=${query}` : `geo:0,0?q=${query}`;
    Linking.openURL(url).catch(() =>
      Linking.openURL(`https://maps.google.com/?q=${query}`),
    );
  };

  return (
    <Modal visible animationType="slide" onRequestClose={closeOverlay}>
      <View
        style={[styles.LocationDetailChassis, { paddingBottom: insets.bottom }]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.LocationDetailImgWrap, { height: verticalScale(300) }]}>
            <Image
              source={img}
              style={[styles.LocationDetailImg, { height: verticalScale(300) }]}
              resizeMode="cover"
            />
            <View style={styles.LocationDetailImgOverlay} />
            <TouchableOpacity
              style={[styles.LocationDetailCloseBtn, { top: insets.top + 12 }]}
              onPress={closeOverlay}
              activeOpacity={0.8}
            >
              <Text style={styles.LocationDetailCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.LocationDetailBody}>
            <View style={styles.LocationDetailTitleRow}>
              <Text style={styles.LocationDetailName}>{location.name}</Text>
              {wishlisted && (
                <View style={styles.LocationDetailWishBadge}>
                  <Text style={{ fontSize: 12 }}>🔖</Text>
                </View>
              )}
            </View>
            <Text style={styles.LocationDetailCoords}>
              📍 {location.coordinates}
            </Text>

            <Text style={styles.LocationDetailParagraph}>
              {location.paragraph1}
            </Text>
            <Text style={styles.LocationDetailParagraph}>
              {location.paragraph2}
            </Text>

            <View style={styles.LocationDetailActions}>
              <PrimaryButton
                label="🗺  Show on Map"
                onPress={openMap}
                style={styles.LocationDetailActionBtn}
              />
              <OutlineButton
                label={
                  wishlisted ? '🔖  Saved to Wishlist' : '📌  Want to Visit'
                }
                onPress={() => toggleWishlist(location.id)}
                style={styles.LocationDetailActionBtn}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  LocationDetailChassis: {
    flex: 1,
    backgroundColor: colors.background,
  },
  LocationDetailImgWrap: {
    height: 300,
    position: 'relative',
  },
  LocationDetailImg: {
    width: '100%',
    height: 300,
  },

  LocationDetailImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${colors.background}55`,
  },
  LocationDetailCloseBtn: {
    position: 'absolute',
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: `${colors.darkCard}CC`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LocationDetailCloseText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  LocationDetailBody: {
    padding: spacing.xl,
    gap: spacing.l,
  },

  LocationDetailTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
  },
  LocationDetailName: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  LocationDetailWishBadge: {
    backgroundColor: colors.primaryGold,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LocationDetailCoords: {
    fontSize: fontSize.small,
    color: colors.mutedText,
    marginTop: -spacing.s,
  },
  LocationDetailParagraph: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  LocationDetailActions: { gap: spacing.m },
  LocationDetailActionBtn: { width: '100%' },
});
