import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import { FoodItem } from '../../types/food';
import { Star, Plus, Minus } from 'lucide-react-native';
import { useCartStore } from '../../store/cartStore';
import { ImageWithPlaceholder } from '../common/ImageWithPlaceholder';

interface FoodCardProps {
  item: FoodItem;
  restaurantInfo: { id: string, name: string, image: string };
  onPress: () => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, restaurantInfo, onPress }) => {
  const { items, addItem, updateQuantity } = useCartStore();

  const cartItem = items.find(i => i.foodId === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: any) => {
    e.stopPropagation();
    if (item.customizations && item.customizations.length > 0) {
      onPress();
    } else {
      addItem({
        id: item.id,
        foodId: item.id,
        restaurantId: item.restaurantId,
        name: item.name,
        price: item.price,
        quantity: 1,
        customizations: []
      }, restaurantInfo);
    }
  };

  const handleIncrement = (e: any) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, quantity + 1);
    }
  };

  const handleDecrement = (e: any) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, quantity - 1);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.info}>
        <View style={styles.vegIndicator}>
          <View style={[styles.vegDot, { backgroundColor: item.isVeg ? '#00A86B' : '#C82333' }]} />
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Star size={12} color="#FFC107" fill="#FFC107" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        )}
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>

      <View style={styles.imageWrapper}>
        <ImageWithPlaceholder source={{ uri: item.image }} style={styles.image} />
        <View style={styles.actionContainer}>
          {quantity > 0 && !item.customizations?.length ? (
            <View style={styles.quantitySelector}>
              <TouchableOpacity onPress={handleDecrement} style={styles.qtyBtn}>
                <Minus size={16} color={theme.colors.primary} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncrement} style={styles.qtyBtn}>
                <Plus size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>ADD</Text>
              <Plus size={12} color={theme.colors.primary} style={styles.addIcon} />
            </TouchableOpacity>
          )}
          {item.customizations && item.customizations.length > 0 && (
            <Text style={styles.customizableText}>customizable</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  info: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  name: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  price: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFC107',
    fontWeight: theme.typography.fontWeight.bold,
    marginLeft: 2,
  },
  description: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    position: 'relative',
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: theme.radius.md,
    resizeMode: 'cover',
  },
  actionContainer: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  addButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    width: 80,
    ...theme.shadows.sm,
  },
  addText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 14,
  },
  addIcon: {
    marginLeft: 4,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    width: 80,
    paddingVertical: 4,
    ...theme.shadows.sm,
  },
  qtyBtn: {
    paddingHorizontal: 8,
  },
  qtyText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 14,
  },
  customizableText: {
    fontSize: 8,
    color: theme.colors.textSecondary,
    marginTop: 2,
  }
});
