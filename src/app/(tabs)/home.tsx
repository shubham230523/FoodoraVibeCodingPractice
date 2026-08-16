import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';
import { useRestaurants } from '../../features/restaurant/hooks/useRestaurants';
import { RestaurantCard } from '../../components/restaurant/RestaurantCard';
import { CategoryItem } from '../../features/home/components/CategoryItem';
import { foodCategories } from '../../data/categories';
import { Search, MapPin, ChevronDown, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '../../store/userStore';
import { Logo } from '../../components/common/Logo';
import { ImageWithPlaceholder } from '../../components/common/ImageWithPlaceholder';

export default function HomeScreen() {
  const router = useRouter();
  const { data: restaurants, isLoading } = useRestaurants();
  const { getSelectedAddress } = useUserStore();
  const currentAddress = getSelectedAddress();

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.locationContainer} onPress={() => router.push('/address')}>
        <MapPin size={20} color={theme.colors.primary} fill={theme.colors.primary} />
        <View style={styles.locationTextContainer}>
          <View style={styles.locationRow}>
            <Text style={styles.locationTitle}>{currentAddress?.type || 'Select Location'}</Text>
            <ChevronDown size={16} color={theme.colors.text} />
          </View>
          <Text style={styles.addressText} numberOfLines={1}>
            {currentAddress ? `${currentAddress.flatNumber}, ${currentAddress.area}` : 'Click to add address'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSearchBar = () => (
    <TouchableOpacity
      style={styles.searchBar}
      onPress={() => router.push('/(tabs)/search')}
      activeOpacity={0.9}
    >
      <Search size={20} color={theme.colors.primary} />
      <Text style={styles.searchPlaceholder}>Search for restaurants, dishes...</Text>
    </TouchableOpacity>
  );

  const renderCategories = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What's on your mind?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
        {foodCategories.map((item) => (
          <CategoryItem
            key={item.id}
            name={item.name}
            image={item.image}
            onPress={() => router.push(`/listing/${item.name}`)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Logo size="md" />
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        {renderHeader()}
        {renderSearchBar()}

        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
          <ImageWithPlaceholder
            source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>50% OFF</Text>
            <Text style={styles.bannerSubtitle}>On your first order</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {renderCategories()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Restaurants</Text>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading deliciousness...</Text>
          ) : (
            restaurants?.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onPress={() => router.push(`/restaurant/${restaurant.id}`)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginRight: 4,
  },
  addressText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    maxWidth: 200,
  },
  notificationButton: {
    padding: theme.spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  searchPlaceholder: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
  },
  bannerContainer: {
    marginHorizontal: theme.spacing.lg,
    height: 150,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: theme.spacing.xl,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    ...StyleSheet.absoluteFill,
  },
  bannerTitle: {
    color: theme.colors.white,
    fontSize: 28,
    fontWeight: theme.typography.fontWeight.bold,
  },
  bannerSubtitle: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    marginBottom: theme.spacing.sm,
  },
  bannerButton: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.xs,
  },
  bannerButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 12,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  categoriesContainer: {
    paddingLeft: theme.spacing.lg,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  }
});
