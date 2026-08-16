import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../theme/theme';
import { useRestaurant } from '../../features/restaurant/hooks/useRestaurants';
import { useMenu } from '../../features/menu/hooks/useMenu';
import { FoodCard } from '../../components/food/FoodCard';
import { ChevronLeft, Search, Heart, Share2, Info, Star, Clock } from 'lucide-react-native';
import { useFavoriteStore } from '../../store/favoriteStore';
import { useCartStore } from '../../store/cartStore';
import { ImageWithPlaceholder } from '../../components/common/ImageWithPlaceholder';

const { width } = Dimensions.get('window');

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: restaurant, isLoading: isResLoading } = useRestaurant(id!);
  const { data: menu, isLoading: isMenuLoading } = useMenu(id!);

  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const { items, getTotals } = useCartStore();
  const totals = getTotals();

  const favorite = isFavorite(id!);

  const menuSections = useMemo(() => {
    if (!menu) return [];
    const categories = Array.from(new Set(menu.map(item => item.category)));
    return categories.map(cat => ({
      title: cat,
      data: menu.filter(item => item.category === cat)
    }));
  }, [menu]);

  if (isResLoading || isMenuLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!restaurant) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn}>
            <Search size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => toggleFavorite(restaurant.id)}
          >
            <Heart size={20} color={favorite ? theme.colors.primary : theme.colors.text} fill={favorite ? theme.colors.primary : 'transparent'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Share2 size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <SectionList
        sections={menuSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            restaurantInfo={{ id: restaurant.id, name: restaurant.name, image: restaurant.image }}
            onPress={() => router.push(`/food/${item.id}`)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.resInfoContainer}>
            <View style={styles.resHeader}>
              <View>
                <Text style={styles.resName}>{restaurant.name}</Text>
                <Text style={styles.resCuisines}>{restaurant.cuisines.join(', ')}</Text>
                <Text style={styles.resAddress}>{restaurant.address}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingVal}>{restaurant.rating}</Text>
                  <Star size={12} color={theme.colors.white} fill={theme.colors.white} />
                </View>
                <Text style={styles.reviewCount}>{restaurant.reviewCount}+ ratings</Text>
              </View>
            </View>

            <View style={styles.deliveryInfo}>
              <View style={styles.infoItem}>
                <Clock size={16} color={theme.colors.text} />
                <Text style={styles.infoText}>{restaurant.deliveryTime} mins</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoText}>₹{restaurant.priceForTwo} for two</Text>
              </View>
            </View>

            {restaurant.offers.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersList}>
                {restaurant.offers.map((offer) => (
                  <View key={offer.id} style={styles.offerCard}>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerDesc}>{offer.description}</Text>
                    <Text style={styles.offerCode}>USE {offer.code}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <View style={styles.menuTitleContainer}>
              <Text style={styles.menuTitle}>MENU</Text>
              <View style={styles.menuUnderline} />
            </View>
          </View>
        )}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
      />

      {items.length > 0 && (
        <TouchableOpacity
          style={styles.cartBar}
          onPress={() => router.push('/cart')}
          activeOpacity={0.9}
        >
          <View>
            <Text style={styles.cartCount}>{items.length} ITEM{items.length > 1 ? 'S' : ''}</Text>
            <Text style={styles.cartTotal}>₹{totals.total} plus taxes</Text>
          </View>
          <View style={styles.viewCart}>
            <Text style={styles.viewCartText}>View Cart</Text>
            <ShoppingBag size={18} color={theme.colors.white} style={{marginLeft: 8}} />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// Simple fallback for ShoppingBag if not imported correctly
const ShoppingBag = ({ size, color, style }: any) => (
  <View style={[{ width: size, height: size, backgroundColor: 'transparent' }, style]} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  headerBtn: {
    padding: theme.spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resInfoContainer: {
    padding: theme.spacing.lg,
    borderBottomWidth: 8,
    borderBottomColor: theme.colors.surface,
  },
  resHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  resName: {
    fontSize: 22,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  resCuisines: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  resAddress: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  ratingBadge: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.radius.sm,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingVal: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: 2,
  },
  reviewCount: {
    color: theme.colors.white,
    fontSize: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.xl,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    marginLeft: 4,
  },
  offersList: {
    marginTop: theme.spacing.md,
  },
  offerCard: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    width: 150,
  },
  offerTitle: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  offerDesc: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  },
  offerCode: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginTop: 4,
  },
  menuTitleContainer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 4,
    color: theme.colors.text,
  },
  menuUnderline: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.primary,
    marginTop: 4,
  },
  sectionHeader: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  listContent: {
    paddingBottom: 100,
  },
  cartBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: theme.colors.success,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.lg,
  },
  cartCount: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
  },
  cartTotal: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  viewCart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCartText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 16,
  }
});
