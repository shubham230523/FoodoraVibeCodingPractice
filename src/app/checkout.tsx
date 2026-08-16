import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../theme/theme';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { useOrderStore } from '../store/orderStore';
import { CreditCard, Wallet, Smartphone, Landmark, Check } from 'lucide-react-native';
import { Button } from '../components/common/Button';
import { OrderStatus } from '../types/order';

type PaymentMethod = 'COD' | 'UPI' | 'CARD';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, restaurantId, restaurantName, restaurantImage, clearCart, getTotals } = useCartStore();
  const { getSelectedAddress } = useUserStore();
  const { addOrder } = useOrderStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const address = getSelectedAddress();
  const totals = getTotals();

  const handlePlaceOrder = () => {
    if (!address) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const newOrder = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        restaurantId: restaurantId!,
        restaurantName: restaurantName!,
        restaurantImage: restaurantImage!,
        items: [...items],
        addressId: address.id,
        paymentMethod: selectedMethod,
        subtotal: totals.subtotal,
        deliveryFee: totals.deliveryFee,
        taxes: totals.tax,
        discount: totals.discount,
        total: totals.total,
        status: OrderStatus.PLACED,
        createdAt: Date.now(),
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      router.push(`/order/${newOrder.id}`);
    }, 2000);
  };

  const renderPaymentOption = (id: PaymentMethod, title: string, subtitle: string, icon: React.ReactNode) => (
    <TouchableOpacity
      style={[styles.paymentOption, selectedMethod === id && styles.selectedOption]}
      onPress={() => setSelectedMethod(id)}
    >
      <View style={styles.optionLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <View>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={[styles.radio, selectedMethod === id && styles.radioSelected]}>
        {selectedMethod === id && <Check size={12} color={theme.colors.white} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {renderPaymentOption(
            'UPI',
            'Google Pay / PhonePe / BHIM UPI',
            'Pay via any UPI app',
            <Smartphone color={theme.colors.text} />
          )}
          {renderPaymentOption(
            'CARD',
            'Credit / Debit Cards',
            'Visa, Mastercard, RuPay',
            <CreditCard color={theme.colors.text} />
          )}
          {renderPaymentOption(
            'COD',
            'Cash on Delivery',
            'Pay after you receive your order',
            <Wallet color={theme.colors.text} />
          )}
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryResName}>{restaurantName}</Text>
            <Text style={styles.summaryItems}>{items.length} item(s) • To Pay: ₹{totals.total}</Text>
          </View>
        </View>

        <View style={styles.safetyInfo}>
          <Text style={styles.safetyText}>
            Your payment is secure. We use industry-standard encryption to protect your data.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.finalTotal}>₹{totals.total}</Text>
          <Text style={styles.viewDetailed}>VIEW DETAILED BILL</Text>
        </View>
        <Button
          title={isProcessing ? "Processing..." : "Place Order"}
          onPress={handlePlaceOrder}
          loading={isProcessing}
          style={styles.placeOrderBtn}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: '#FFF8F8',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: theme.spacing.md,
  },
  optionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  optionSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  summarySection: {
    marginBottom: theme.spacing.xl,
  },
  summaryCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryResName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  summaryItems: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  safetyInfo: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  safetyText: {
    fontSize: 12,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  priceContainer: {
    flex: 1,
  },
  finalTotal: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  viewDetailed: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginTop: 2,
  },
  placeOrderBtn: {
    flex: 2,
    marginLeft: theme.spacing.lg,
  }
});
