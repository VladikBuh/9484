import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GoldCard } from '../common/GoldCard';
import { reservation } from '../../data/reservation';
import { colors, fontSize, spacing } from '../../constants/theme';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.ReservationCardRow}>
      <Text style={styles.ReservationCardLabel}>{label}</Text>
      <Text style={styles.ReservationCardValue}>{value}</Text>
    </View>
  );
}

export function ReservationCard() {
  return (
    <GoldCard glow style={styles.ReservationCardChassis}>
      <View style={styles.ReservationCardHeader}>
        <Text style={styles.ReservationCardHeaderEmoji}>🏨</Text>
        <Text style={styles.ReservationCardHeaderTitle}>Reservation</Text>
        <View style={styles.ReservationCardBadge}>
          <Text style={styles.ReservationCardBadgeText}>Active</Text>
        </View>
      </View>
      <View style={styles.ReservationCardDivider} />
      <Row label="Booking Code" value={reservation.bookingCode} />
      <Row label="Room Number" value={reservation.roomNumber} />
      <Row label="Check-in" value={reservation.checkIn} />
      <Row label="Check-out" value={reservation.checkOut} />
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  ReservationCardChassis: { padding: spacing.xl },
  ReservationCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  ReservationCardHeaderEmoji: { fontSize: 16, marginRight: 6 },
  ReservationCardHeaderTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: '700',
    color: colors.primaryGold,
    flex: 1,
  },
  ReservationCardBadge: {
    backgroundColor: colors.primaryGold,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  ReservationCardBadgeText: {
    fontSize: fontSize.caption,
    fontWeight: '700',
    color: colors.background,
  },
  ReservationCardDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: spacing.m,
  },

  ReservationCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.s,
  },

  ReservationCardLabel: {
    fontSize: fontSize.body,
    color: colors.mutedText,
  },
  ReservationCardValue: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
