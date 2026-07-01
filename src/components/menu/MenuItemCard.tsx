import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GoldCard } from '../common/GoldCard';
import { MenuItem } from '../../types';
import { images } from '../../assets';
import { useMenu } from '../../context/MenuContext';
import { colors, fontSize, radius, spacing } from '../../constants/theme';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart, getQty } = useMenu();
  const [added, setAdded] = useState(false);
  const qty = getQty(item.id);
  const img = images[item.image as keyof typeof images];

  const handleAdd = () => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <GoldCard glow style={styles.MenuItemCardChassis}>
      <Image source={img} style={styles.MenuItemCardImg} resizeMode="cover" />
      <View style={styles.MenuItemCardBody}>
        <Text style={styles.MenuItemCardName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.MenuItemCardIngredients} numberOfLines={2}>
          {item.ingredients}
        </Text>
        <View style={styles.MenuItemCardMeta}>
          <Text style={styles.MenuItemCardPrepTime}>🕐 {item.prepTime}</Text>
          <Text style={styles.MenuItemCardPrice}>€{item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.MenuItemCardFooter}>
          {qty > 0 && (
            <Text style={styles.MenuItemCardInCart}>×{qty} in cart</Text>
          )}
          <TouchableOpacity
            style={[
              styles.MenuItemCardAddBtn,
              added && styles.MenuItemCardAddBtnAdded,
            ]}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.MenuItemCardAddText,
                added && styles.MenuItemCardAddTextAdded,
              ]}
            >
              {added ? '✓ Added' : '+ Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  MenuItemCardChassis: {
    flexDirection: 'row',
    overflow: 'hidden',
  },

  MenuItemCardImg: {
    width: 92,
    height: '100%',
  },
  MenuItemCardBody: {
    flex: 1,
    padding: spacing.m,
    gap: 4,
  },
  MenuItemCardName: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  MenuItemCardIngredients: {
    fontSize: fontSize.small,
    color: colors.mutedText,
  },

  MenuItemCardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  MenuItemCardPrepTime: {
    fontSize: fontSize.small,
    color: colors.mutedText,
  },

  MenuItemCardPrice: {
    fontSize: fontSize.subtitle,
    fontWeight: '700',
    color: colors.primaryGold,
  },
  MenuItemCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 8,
  },

  MenuItemCardInCart: {
    fontSize: fontSize.small,
    color: colors.success,
  },
  MenuItemCardAddBtn: {
    backgroundColor: colors.primaryGold,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  MenuItemCardAddBtnAdded: {
    backgroundColor: `${colors.success}22`,
    borderWidth: 1,
    borderColor: colors.success,
  },

  MenuItemCardAddText: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.background,
  },
  MenuItemCardAddTextAdded: {
    color: colors.success,
  },
});
