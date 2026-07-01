import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoldCard } from '../common/GoldCard';
import { Location } from '../../types';
import { images } from '../../assets';
import { colors, fontSize, radius, spacing } from '../../constants/theme';
import { useAppNavigation } from '../../navigation/NavigationContext';

export function RecommendedCard({ location }: { location: Location }) {
  const { pushOverlay } = useAppNavigation();
  const img = images[location.image as keyof typeof images];

  return (
    <GoldCard glow>
      <Image
        source={img}
        style={styles.RecommendedCardImg}
        resizeMode="cover"
      />
      <View style={styles.RecommendedCardBadge}>
        <Text style={styles.RecommendedCardBadgeText}>Today</Text>
      </View>
      <View style={styles.RecommendedCardBody}>
        <Text style={styles.RecommendedCardName}>{location.name}</Text>
        <Text style={styles.RecommendedCardDesc}>
          {location.shortDescription}
        </Text>
        <View style={styles.RecommendedCardFooter}>
          <Text style={styles.RecommendedCardCoords}>
            📍 {location.coordinates}
          </Text>
          <TouchableOpacity
            onPress={() =>
              pushOverlay({ type: 'LocationDetail', locationId: location.id })
            }
            activeOpacity={0.75}
          >
            <Text style={styles.RecommendedCardLink}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  RecommendedCardImg: {
    width: '100%',
    height: 160,
  },
  RecommendedCardBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.primaryGold,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  RecommendedCardBadgeText: {
    fontSize: fontSize.caption,
    fontWeight: '700',
    color: colors.background,
  },

  RecommendedCardBody: { padding: spacing.l },
  RecommendedCardName: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },

  RecommendedCardDesc: {
    fontSize: fontSize.body,
    color: colors.mutedText,
    marginBottom: spacing.m,
  },

  RecommendedCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  RecommendedCardCoords: {
    fontSize: fontSize.caption,
    color: colors.mutedText,
  },
  RecommendedCardLink: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.primaryGold,
  },
});
