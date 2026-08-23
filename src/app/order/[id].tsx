import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../theme/theme';
import { useOrderStore } from '../../store/orderStore';
import { OrderStatus } from '../../types/order';
import { ChevronLeft, Phone, MessageSquare, MapPin, CheckCircle2, Circle, Package, ReceiptText } from 'lucide-react-native';
import { useResponsive } from '../../hooks/useResponsive';

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isLargeScreen } = useResponsive();
  const { getOrder, updateOrderStatus } = useOrderStore();

  const order = getOrder(id!);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { status: OrderStatus.PLACED, title: 'Order Placed', time: '12:30 PM' },
    { status: OrderStatus.CONFIRMED, title: 'Confirmed', time: '12:32 PM' },
    { status: OrderStatus.PREPARING, title: 'Preparing', time: '12:35 PM' },
    { status: OrderStatus.READY, title: 'Ready for pickup', time: '12:45 PM' },
    { status: OrderStatus.OUT_FOR_DELIVERY, title: 'Out for delivery', time: '12:50 PM' },
    { status: OrderStatus.DELIVERED, title: 'Delivered', time: '01:05 PM' },
  ];

  useEffect(() => {
    if (!order) return;

    const statusIndex = steps.findIndex(s => s.status === order.status);
    setActiveStep(statusIndex);

    // Simulate status changes
    if (order.status !== OrderStatus.DELIVERED) {
      const timers = [
        setTimeout(() => updateOrderStatus(id!, OrderStatus.CONFIRMED), 3000),
        setTimeout(() => updateOrderStatus(id!, OrderStatus.PREPARING), 8000),
        setTimeout(() => updateOrderStatus(id!, OrderStatus.READY), 15000),
        setTimeout(() => updateOrderStatus(id!, OrderStatus.OUT_FOR_DELIVERY), 22000),
        setTimeout(() => updateOrderStatus(id!, OrderStatus.DELIVERED), 30000),
      ];
      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [order?.status]);

  if (!order) return null;

  const renderTimeline = () => (
    <View style={styles.trackingSection}>
      <Text style={styles.sectionTitle}>Track Order</Text>
      <View style={styles.timeline}>
        {steps.map((step, index) => (
          <View key={step.status} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              {index <= activeStep ? (
                <CheckCircle2 size={24} color={theme.colors.success} fill={theme.colors.white} />
              ) : (
                <Circle size={24} color={theme.colors.textLight} />
              )}
              {index < steps.length - 1 && (
                <View style={[styles.timelineLine, index < activeStep && styles.lineActive]} />
              )}
            </View>
            <View style={styles.timelineRight}>
              <Text style={[styles.stepTitle, index <= activeStep && styles.activeText]}>
                {step.title}
              </Text>
              {index <= activeStep && <Text style={styles.stepTime}>{step.time}</Text>}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderOrderItems = () => (
    <View style={styles.itemsCard}>
      <View style={styles.cardHeader}>
        <Package size={20} color={theme.colors.textSecondary} />
        <Text style={styles.cardTitle}>Order Items</Text>
      </View>
      {order.items.map((item, idx) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemQty}>{item.quantity} x</Text>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
        </View>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Paid</Text>
        <Text style={styles.totalValue}>₹{order.total}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{order.id}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.responsiveWrapper}>
          <View style={styles.restaurantCard}>
            <Image source={{ uri: order.restaurantImage }} style={styles.resImage} />
            <View style={styles.resInfo}>
              <Text style={styles.resName}>{order.restaurantName}</Text>
              <Text style={styles.orderSummary}>{order.items.length} items • ₹{order.total}</Text>
            </View>
            <View style={styles.actionIcons}>
              <TouchableOpacity style={styles.iconBtn}><Phone size={20} color={theme.colors.primary} /></TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}><MessageSquare size={20} color={theme.colors.primary} /></TouchableOpacity>
            </View>
          </View>

          <View style={isLargeScreen ? styles.twoColumnLayout : null}>
            <View style={isLargeScreen ? styles.mainCol : null}>
              {renderTimeline()}
            </View>

            <View style={isLargeScreen ? styles.sideCol : null}>
              {renderOrderItems()}

              <View style={styles.deliveryCard}>
                <View style={styles.deliveryHeader}>
                  <MapPin size={20} color={theme.colors.textSecondary} />
                  <Text style={styles.deliveryTitle}>Delivery Address</Text>
                </View>
                <Text style={styles.addressText}>
                  A-402, Sunshine Apartments, HSR Layout, Near HSR Police Station, Bangalore
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  responsiveWrapper: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  restaurantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  resImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  resInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  resName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  orderSummary: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  mainCol: {
    flex: 1.5,
  },
  sideCol: {
    flex: 1,
    gap: theme.spacing.lg,
  },
  trackingSection: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.xl,
  },
  timeline: {
    paddingLeft: theme.spacing.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    height: 70,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 4,
  },
  lineActive: {
    backgroundColor: theme.colors.success,
  },
  timelineRight: {
    flex: 1,
    paddingTop: 2,
  },
  stepTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  activeText: {
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.bold,
  },
  stepTime: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  itemsCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.spacing.sm,
  },
  cardTitle: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
  itemQty: {
    width: 30,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  itemName: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.text,
  },
  itemPrice: {
    fontSize: 12,
    color: theme.colors.text,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  deliveryCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    ...theme.shadows.md,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  deliveryTitle: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
  },
  addressText: {
    fontSize: 12,
    color: theme.colors.text,
    lineHeight: 18,
  }
});
