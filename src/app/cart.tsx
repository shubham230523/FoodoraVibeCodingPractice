import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../theme/theme';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { Minus, Plus, ChevronRight, MapPin, Tag } from 'lucide-react-native';
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';

export default function CartScreen() {
  const router = useRouter();
  const { isLargeScreen } = useResponsive();
  const {
    items,
    restaurantName,
    updateQuantity,
    getTotals,
    appliedCoupon
  } = useCartStore();

  const { getSelectedAddress } = useUserStore();
  const address = getSelectedAddress();
  const totals = getTotals();

  const emptyCartImageSource = React.useMemo(() => ({
    uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400'
  }), []);

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={emptyCartImageSource}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Good food is always cooking! Go ahead, order some yummy items from the menu.</Text>
        <Button
          title="Browse Restaurants"
          onPress={() => router.push('/(tabs)/home')}
          style={styles.browseBtn}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.responsiveWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.addMore}>ADD MORE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsSection}>
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {item.customizations.length > 0 && (
                    <Text style={styles.itemCustoms}>
                      {item.customizations.map(c => c.optionName).join(', ')}
                    </Text>
                  )}
                  <Text style={styles.itemPrice}>₹{item.price + item.customizations.reduce((s, c) => s + c.price, 0)}</Text>
                </View>

                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={14} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.couponSection}>
            <View style={styles.couponLeft}>
              <Tag size={20} color={theme.colors.text} />
              <Text style={styles.couponText}>
                {appliedCoupon ? `Applied: ${appliedCoupon.code}` : 'Use Coupons'}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.billSection}>
            <Text style={styles.billTitle}>Bill Details</Text>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{totals.subtotal}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValue}>₹{totals.deliveryFee}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Taxes and Charges</Text>
              <Text style={styles.billValue}>₹{totals.tax}</Text>
            </View>
            {totals.discount > 0 && (
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, { color: theme.colors.success }]}>Item Discount</Text>
                <Text style={[styles.billValue, { color: theme.colors.success }]}>-₹{totals.discount}</Text>
              </View>
            )}
            <View style={[styles.billRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>To Pay</Text>
              <Text style={styles.totalValue}>₹{totals.total}</Text>
            </View>
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policyTitle}>Cancellation Policy</Text>
            <Text style={styles.policyText}>
              Help us in reducing food waste by avoiding cancellations after placing your order.
              A 100% cancellation fee will be applicable.
            </Text>
          </View>
        </ScrollView>

        <View style={[styles.footer, isLargeScreen && styles.largeFooter]}>
          <TouchableOpacity
            style={styles.addressSection}
            onPress={() => router.push('/address')}
          >
            <MapPin size={20} color={theme.colors.primary} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Deliver to {address?.type || 'Select Address'}</Text>
              <Text style={styles.addressDetail} numberOfLines={1}>
                {address ? `${address.flatNumber}, ${address.area}` : 'Click to add delivery address'}
              </Text>
            </View>
            <Text style={styles.changeText}>CHANGE</Text>
          </TouchableOpacity>

          <Button
            title="Proceed to Pay"
            onPress={() => router.push('/checkout')}
            style={styles.payBtn}
            disabled={!address}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  responsiveWrapper: {
    flex: 1,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
    backgroundColor: theme.colors.background,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  emptySubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  browseBtn: {
    width: '100%',
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
  },
  addMore: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 12,
  },
  itemsSection: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
  itemCustoms: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    padding: 4,
  },
  qtyBtn: {
    paddingHorizontal: 8,
  },
  qtyText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    marginHorizontal: 8,
  },
  couponSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponText: {
    marginLeft: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
  billSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  billTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  billLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
  },
  billValue: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
  },
  totalRow: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  totalValue: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  policySection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  policyTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 4,
  },
  policyText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    lineHeight: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  largeFooter: {
    maxWidth: 800,
    alignSelf: 'center',
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  addressInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  addressTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
  },
  addressDetail: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  changeText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
  },
  payBtn: {
    width: '100%',
  }
});
