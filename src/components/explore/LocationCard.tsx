import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoldCard } from '../common/GoldCard';
import { Location } from '../../types';
import { images } from '../../assets';
import { useExplore } from '../../context/ExploreContext';
import { useAppNavigation } from '../../navigation/NavigationContext';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export function LocationCard({ location }: { location: Location }) {
  const { isWishlisted, toggleWishlist } = useExplore();
  const { pushOverlay } = useAppNavigation();
  const wishlisted = isWishlisted(location.id);
  const img = images[location.image as keyof typeof images];

  return (
    <GoldCard style={styles.LocationCardChassis}>
      <View style={styles.LocationCardImgWrap}>
        <Image
          source={img}
          style={{ width: 92, height: 130 }}
          resizeMode="cover"
        />
        {wishlisted && (
          <View style={styles.LocationCardWishlistBadge}>
            <Text style={styles.LocationCardWishlistIcon}>🔖</Text>
          </View>
        )}
      </View>
      <View style={styles.LocationCardBody}>
        <Text style={styles.LocationCardName} numberOfLines={1}>
          {location.name}
        </Text>
        <Text style={styles.LocationCardCoords}>📍 {location.coordinates}</Text>
        <Text style={styles.LocationCardDesc} numberOfLines={1}>
          {location.shortDescription}
        </Text>
        <View style={styles.LocationCardFooter}>
          <TouchableOpacity
            style={styles.LocationCardSeeBtn}
            onPress={() =>
              pushOverlay({ type: 'LocationDetail', locationId: location.id })
            }
            activeOpacity={0.75}
          >
            <Text style={styles.LocationCardSeeBtnText}>See More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleWishlist(location.id)}
            activeOpacity={0.75}
            style={styles.LocationCardBookmarkBtn}
          >
            <Text
              style={[
                styles.LocationCardBookmarkIcon,
                wishlisted && styles.LocationCardBookmarkIconActive,
              ]}
            >
              {wishlisted ? '🔖' : '📌'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  LocationCardChassis: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  LocationCardImgWrap: {
    width: 92,
    alignSelf: 'stretch',
  },

  LocationCardWishlistBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.primaryGold,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LocationCardWishlistIcon: { fontSize: 12 },
  LocationCardBody: {
    flex: 1,
    padding: spacing.m,
    gap: 3,
  },

  LocationCardName: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  LocationCardCoords: {
    fontSize: fontSize.caption,
    color: colors.mutedText,
  },
  LocationCardDesc: {
    fontSize: fontSize.small,
    color: colors.textSecondary,
  },
  LocationCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.s,
  },

  LocationCardSeeBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: `${colors.primaryGold}20`,
    borderWidth: 1,
    borderColor: `${colors.primaryGold}50`,
  },
  LocationCardSeeBtnText: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.primaryGold,
  },

  LocationCardBookmarkBtn: {
    padding: spacing.s,
  },
  LocationCardBookmarkIcon: {
    fontSize: 18,
    opacity: 0.5,
  },
  LocationCardBookmarkIconActive: {
    opacity: 1,
  },
});
