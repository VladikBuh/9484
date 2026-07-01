import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoldCard } from '../common/GoldCard';
import { GuestRequest } from '../../types';
import { images } from '../../assets';
import { useRequests } from '../../context/RequestsContext';
import { colors, fontSize, spacing } from '../../constants/theme';

interface RequestCardProps {
  request: GuestRequest;
  onSend: () => void;
}

export function RequestCard({ request, onSend }: RequestCardProps) {
  const { getQuantity, setQuantity } = useRequests();
  const qty = getQuantity(request.id);
  const img = images[request.image as keyof typeof images];

  return (
    <GoldCard style={styles.RequestCardChassis}>
      <Image source={img} style={styles.RequestCardImg} resizeMode="cover" />
      <View style={styles.RequestCardBody}>
        <Text style={styles.RequestCardTitle}>
          {request.emoji} {request.title}
        </Text>
        <Text style={styles.RequestCardDesc}>{request.description}</Text>
        <View style={styles.RequestCardFooter}>
          <View style={styles.RequestCardQtyRow}>
            <TouchableOpacity
              style={styles.RequestCardQtyBtn}
              onPress={() => setQuantity(request.id, Math.max(1, qty - 1))}
            >
              <Text style={styles.RequestCardQtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.RequestCardQtyVal}>{qty}</Text>
            <TouchableOpacity
              style={styles.RequestCardQtyBtn}
              onPress={() => setQuantity(request.id, Math.min(10, qty + 1))}
            >
              <Text style={styles.RequestCardQtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.RequestCardSendBtn}
            onPress={onSend}
            activeOpacity={0.8}
          >
            <Text style={styles.RequestCardSendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  RequestCardChassis: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },

  RequestCardImg: {
    width: 80,
    height: 80,
    marginLeft: 5,
  },
  RequestCardBody: {
    flex: 1,
    padding: spacing.m,
  },
  RequestCardTitle: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  RequestCardDesc: {
    fontSize: fontSize.small,
    color: colors.mutedText,
    marginBottom: spacing.s,
  },
  RequestCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  RequestCardQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  RequestCardQtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.elevatedCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RequestCardQtyBtnText: {
    fontSize: 16,
    color: colors.primaryGold,
    lineHeight: 20,
  },
  RequestCardQtyVal: {
    fontSize: fontSize.subtitle,
    fontWeight: '600',
    color: colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },

  RequestCardSendBtn: {
    backgroundColor: colors.primaryGold,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },

  RequestCardSendText: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.background,
  },
});
