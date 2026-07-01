import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CartItemRow } from '../components/menu/CartItemRow';
import { PrimaryButton } from '../components/buttons/PrimaryButton';

import { ConfirmModal } from '../components/common/ConfirmModal';

import { useMenu } from '../context/MenuContext';

import { useAppNavigation } from '../navigation/NavigationContext';
import { colors, fontSize, radius, spacing } from '../constants/theme';
import { useAdaptive } from '../hooks/useAdaptive';

export function CartScreen() {
  const insets = useSafeAreaInsets();
  const { scale, verticalScale } = useAdaptive();
  const { cart, cartNote, setCartNote, cartTotal, clearCart } = useMenu();
  const { closeOverlay } = useAppNavigation();
  const [orderSent, setOrderSent] = useState(false);

  const handleSubmit = () => {
    clearCart();
    setOrderSent(true);
  };

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeOverlay}
    >
      <View
        style={[
          styles.CartScreenChassis,
          { paddingBottom: insets.bottom || spacing.xl },
        ]}
      >
        <View style={styles.CartScreenHandle} />

        <View style={styles.CartScreenHeader}>
          <Text style={styles.CartScreenTitle}>Your Order</Text>
          <TouchableOpacity
            onPress={closeOverlay}
            style={styles.CartScreenCloseBtn}
          >
            <Text style={styles.CartScreenCloseText}>✕</Text>
          </TouchableOpacity>
        </View>

        {cart.length === 0 ? (
          <View style={styles.CartScreenEmpty}>
            <Text style={styles.CartScreenEmptyEmoji}>🍽</Text>
            <Text style={styles.CartScreenEmptyText}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <ScrollView
              style={[styles.CartScreenList, { maxHeight: verticalScale(280) }]}
              contentContainerStyle={styles.CartScreenListContent}
              showsVerticalScrollIndicator={false}
            >
              {cart.map(item => (
                <CartItemRow key={item.menuItemId} item={item} />
              ))}
            </ScrollView>

            <View style={styles.CartScreenDivider} />

            <View style={styles.CartScreenNoteWrap}>
              <Text style={styles.CartScreenNoteLabel}>Special Requests</Text>
              <TextInput
                style={styles.CartScreenNoteInput}
                value={cartNote}
                onChangeText={setCartNote}
                placeholder="Any allergies or special instructions..."
                placeholderTextColor={colors.mutedText}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.CartScreenFooter}>
              <View>
                <Text style={styles.CartScreenTotalLabel}>Total</Text>
                <Text style={styles.CartScreenTotalValue}>
                  €{cartTotal.toFixed(2)}
                </Text>
              </View>
              <PrimaryButton
                label="Submit Order"
                onPress={handleSubmit}
                style={{ width: scale(160) }}
              />
            </View>
          </>
        )}
      </View>

      <ConfirmModal
        visible={orderSent}
        icon="🍽"
        title="Order Placed"
        message="Your order has been sent to the kitchen. Enjoy your meal!"
        onClose={() => {
          setOrderSent(false);
          closeOverlay();
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  CartScreenChassis: {
    flex: 1,
    backgroundColor: colors.darkCard,
  },

  CartScreenHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.divider,
    alignSelf: 'center',
    marginTop: spacing.m,
    marginBottom: spacing.l,
  },

  CartScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.l,
  },
  CartScreenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  CartScreenCloseBtn: { padding: spacing.s },
  CartScreenCloseText: {
    fontSize: 18,
    color: colors.mutedText,
  },
  CartScreenEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.m,
  },

  CartScreenEmptyEmoji: { fontSize: 48 },
  CartScreenEmptyText: {
    fontSize: fontSize.subtitle,
    color: colors.mutedText,
  },
  CartScreenList: { maxHeight: 280 },
  CartScreenListContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.s,
    paddingBottom: spacing.m,
  },

  CartScreenDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.m,
    marginHorizontal: spacing.xl,
  },
  CartScreenNoteWrap: {
    paddingHorizontal: spacing.xl,
    gap: spacing.s,
    marginBottom: spacing.m,
  },

  CartScreenNoteLabel: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  CartScreenNoteInput: {
    backgroundColor: colors.elevatedCard,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.m,
    fontSize: fontSize.body,
    color: colors.textPrimary,
    minHeight: 72,
    textAlignVertical: 'top',
  },

  CartScreenFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.m,
  },

  CartScreenTotalLabel: {
    fontSize: fontSize.small,
    color: colors.mutedText,
  },

  CartScreenTotalValue: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primaryGold,
  },
  CartScreenSubmitBtn: { width: 160 },
});
