import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../theme/theme';
import { useOrderStore } from '../../store/orderStore';
import { Order } from '../../types/order';
import { ChevronRight, RefreshCw, Star } from 'lucide-react-native';
import { Badge } from '../../components/common/Badge';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useOrderStore();

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => router.push(`/order/${item.id}`)}
    >
      <View style={styles.cardTop}>
        <Image source={{ uri: item.restaurantImage }} style={styles.resImage} />
        <View style={styles.resInfo}>
          <Text style={styles.resName}>{item.restaurantName}</Text>
          <Text style={styles.orderDate}>
            {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </Text>
        </View>
        <View style={styles.statusBadge}>
          <Badge text={item.status} variant={item.status === 'DELIVERED' ? 'success' : 'primary'} />
        </View>
      </View>

      <View style={styles.itemSummary}>
        <Text style={styles.itemsText} numberOfLines={1}>
          {item.items.map(i => `${i.quantity} x ${i.name}`).join(', ')}
        </Text>
        <Text style={styles.totalText}>₹{item.total}</Text>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.reorderBtn}>
          <RefreshCw size={14} color={theme.colors.primary} />
          <Text style={styles.reorderText}>REORDER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateBtn}>
          <Star size={14} color={theme.colors.textSecondary} />
          <Text style={styles.rateText}>RATE ORDER</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Orders</Text>
        </View>
        <View style={styles.emptyState}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1595475243692-3a2164a2d480?w=400' }}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Hungry? Start exploring restaurants near you!</Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.exploreText}>Explore Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  orderCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  resImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  resInfo: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  resName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  orderDate: {
    fontSize: 10,
    color: theme.colors.textLight,
  },
  statusBadge: {
    alignItems: 'flex-end',
  },
  itemSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.surface,
  },
  itemsText: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.lg,
  },
  totalText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  cardActions: {
    flexDirection: 'row',
    marginTop: theme.spacing.md,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.xl,
  },
  reorderText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginLeft: 6,
  },
  rateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    marginLeft: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing.xl,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 18,
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
  exploreBtn: {
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
  exploreText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  }
});
