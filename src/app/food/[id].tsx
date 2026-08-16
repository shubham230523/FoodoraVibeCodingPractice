import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../theme/theme';
import { allFoodItems } from '../../data/foodItems';
import { restaurants } from '../../data/restaurants';
import { X, Minus, Plus } from 'lucide-react-native';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../../components/common/Button';
import { SelectedCustomization } from '../../types/cart';
import { ImageWithPlaceholder } from '../../components/common/ImageWithPlaceholder';

const { height } = Dimensions.get('window');

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const foodItem = allFoodItems.find(item => item.id === id);
  const restaurant = restaurants.find(r => r.id === foodItem?.restaurantId);

  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);

  const { addItem } = useCartStore();

  if (!foodItem || !restaurant) return null;

  const handleToggleOption = (cust: any, option: any) => {
    const isSelected = selectedCustomizations.find(sc => sc.optionId === option.id);

    if (isSelected) {
      setSelectedCustomizations(prev => prev.filter(sc => sc.optionId !== option.id));
    } else {
      // Handle radio button behavior for single choice
      if (cust.isRequired && cust.options.length > 0) {
        // Find if any other option from this customization is selected
        const otherSelected = selectedCustomizations.filter(sc => sc.customizationId !== cust.id);
        setSelectedCustomizations([...otherSelected, {
          customizationId: cust.id,
          customizationTitle: cust.title,
          optionId: option.id,
          optionName: option.name,
          price: option.price
        }]);
      } else {
        setSelectedCustomizations(prev => [...prev, {
          customizationId: cust.id,
          customizationTitle: cust.title,
          optionId: option.id,
          optionName: option.name,
          price: option.price
        }]);
      }
    }
  };

  const calculateTotalPrice = () => {
    const customizationsPrice = selectedCustomizations.reduce((sum, sc) => sum + sc.price, 0);
    return (foodItem.price + customizationsPrice) * quantity;
  };

  const handleAddToCart = () => {
    // Basic validation for required customizations
    const missingRequired = foodItem.customizations?.filter(c =>
      c.isRequired && !selectedCustomizations.some(sc => sc.customizationId === c.id)
    );

    if (missingRequired && missingRequired.length > 0) {
      alert(`Please select ${missingRequired[0].title}`);
      return;
    }

    addItem({
      id: `${foodItem.id}-${selectedCustomizations.map(sc => sc.optionId).sort().join('-')}`,
      foodId: foodItem.id,
      restaurantId: foodItem.restaurantId,
      name: foodItem.name,
      price: foodItem.price,
      quantity,
      customizations: selectedCustomizations
    }, {
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <ImageWithPlaceholder source={{ uri: foodItem.image }} style={styles.image} />
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <X size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.vegIndicator}>
            <View style={[styles.vegDot, { backgroundColor: foodItem.isVeg ? '#00A86B' : '#C82333' }]} />
          </View>
          <Text style={styles.name}>{foodItem.name}</Text>
          <Text style={styles.description}>{foodItem.description}</Text>
          <Text style={styles.basePrice}>₹{foodItem.price}</Text>
        </View>

        {foodItem.customizations?.map(cust => (
          <View key={cust.id} style={styles.customSection}>
            <View style={styles.customHeader}>
              <View>
                <Text style={styles.customTitle}>{cust.title}</Text>
                <Text style={styles.customSubtitle}>
                  {cust.isRequired ? 'Required • Select 1' : 'Optional'}
                </Text>
              </View>
            </View>

            {cust.options.map(option => {
              const isSelected = selectedCustomizations.some(sc => sc.optionId === option.id);
              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={() => handleToggleOption(cust, option)}
                >
                  <View style={styles.optionLeft}>
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={styles.optionName}>{option.name}</Text>
                  </View>
                  <Text style={styles.optionPrice}>
                    {option.price > 0 ? `+₹${option.price}` : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.quantitySection}>
          <Text style={styles.quantityTitle}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.qtyBtn}
            >
              <Minus size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => setQuantity(quantity + 1)}
              style={styles.qtyBtn}
            >
              <Plus size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Add item • ₹${calculateTotalPrice()}`}
          onPress={handleAddToCart}
          style={styles.addBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },
  infoSection: {
    padding: theme.spacing.lg,
    borderBottomWidth: 8,
    borderBottomColor: theme.colors.surface,
  },
  vegIndicator: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  vegDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  basePrice: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginTop: 12,
  },
  customSection: {
    padding: theme.spacing.lg,
    borderBottomWidth: 8,
    borderBottomColor: theme.colors.surface,
  },
  customHeader: {
    marginBottom: theme.spacing.md,
  },
  customTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  customSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  radioSelected: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  optionName: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  optionPrice: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  quantitySection: {
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 4,
  },
  qtyBtn: {
    padding: 8,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    marginHorizontal: theme.spacing.lg,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  addBtn: {
    width: '100%',
  }
});
