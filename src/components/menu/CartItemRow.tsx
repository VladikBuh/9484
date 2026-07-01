import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartItem } from '../../types';
import { images } from '../../assets';
import { useMenu } from '../../context/MenuContext';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export function CartItemRow({ item }: { item: CartItem }) {
  const { increaseQty, decreaseQty } = useMenu();
  const img = images[item.image as keyof typeof images];

  return (
    <View style={styles.CartItemRowChassis}>
      <Image source={img} style={styles.CartItemRowImg} resizeMode="cover" />
      <View style={styles.CartItemRowInfo}>
        <Text style={styles.CartItemRowName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.CartItemRowPrice}>
          €{item.price.toFixed(2)} each
        </Text>
      </View>
      <View style={styles.CartItemRowQty}>
        <TouchableOpacity
          style={styles.CartItemRowQtyBtn}
          onPress={() => decreaseQty(item.menuItemId)}
        >
          <Text style={styles.CartItemRowQtyBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.CartItemRowQtyVal}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.CartItemRowQtyBtn}
          onPress={() => increaseQty(item.menuItemId)}
        >
          <Text style={styles.CartItemRowQtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.CartItemRowTotal}>
        €{(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  CartItemRowChassis: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
    backgroundColor: colors.graphiteCard,
    borderRadius: radius.small,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  CartItemRowImg: {
    width: 50,
    height: 50,
  },

  CartItemRowInfo: { flex: 1, paddingVertical: spacing.s },
  CartItemRowName: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  CartItemRowPrice: {
    fontSize: fontSize.small,
    color: colors.mutedText,
    marginTop: 2,
  },

  CartItemRowQty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  CartItemRowQtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.elevatedCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartItemRowQtyBtnText: {
    fontSize: 15,
    color: colors.primaryGold,
    lineHeight: 18,
  },

  CartItemRowQtyVal: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textPrimary,
    minWidth: 18,
    textAlign: 'center',
  },
  CartItemRowTotal: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.primaryGold,
    minWidth: 52,
    textAlign: 'right',
    paddingRight: spacing.m,
  },
});
