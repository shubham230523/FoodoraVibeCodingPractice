import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';
import { Search, X, Clock, TrendingUp, Filter, ChevronRight, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSearch } from '../../features/search/hooks/useSearch';
import { RestaurantCard } from '../../components/restaurant/RestaurantCard';
import { useResponsive } from '../../hooks/useResponsive';

export default function SearchScreen() {
  const router = useRouter();
  const { isLargeScreen, width } = useResponsive();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading } = useSearch(debouncedQuery);

  const recentSearches = ['Pizza', 'Burger', 'Biryani', 'Starbucks'];
  const trendingSearches = ['Healthy Salads', 'Ice Cream', 'Rolls', 'Paneer Tikka'];

  const filters = ['Rating 4.0+', 'Fast Delivery', 'Pure Veg', 'Offers', 'Cuisines'];

  const numColumns = isLargeScreen ? 3 : 1;

  const renderRecentSearch = (item: string) => (
    <TouchableOpacity
      key={item}
      style={styles.recentItem}
      onPress={() => setQuery(item)}
    >
      <Clock size={16} color={theme.colors.textSecondary} />
      <Text style={styles.recentText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderTrendingSearch = (item: string) => (
    <TouchableOpacity
      key={item}
      style={styles.trendingItem}
      onPress={() => setQuery(item)}
    >
      <TrendingUp size={16} color={theme.colors.primary} />
      <Text style={styles.trendingText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderResultItem = (item: any) => {
    const itemStyle = isLargeScreen
      ? [styles.gridItem, { width: `${100 / numColumns}%` }]
      : styles.mobileItem;

    if ('cuisines' in item) {
      return (
        <View key={item.id} style={itemStyle}>
          <RestaurantCard
            restaurant={item}
            onPress={() => router.push(`/restaurant/${item.id}`)}
            style={styles.cardSizing}
          />
        </View>
      );
    }

    return (
      <View key={item.id} style={itemStyle}>
        <TouchableOpacity
          style={[styles.dishCard, styles.cardSizing]}
          onPress={() => router.push(`/restaurant/${item.restaurantId}`)}
        >
          <Image source={{ uri: item.image }} style={styles.dishCardImage} />
          <View style={styles.dishCardContent}>
            <View style={styles.dishCardHeader}>
              <Text style={styles.dishCardName} numberOfLines={1}>{item.name}</Text>
              {item.rating && (
                <View style={styles.dishRating}>
                  <Text style={styles.dishRatingText}>{item.rating}</Text>
                  <Star size={10} color={theme.colors.white} fill={theme.colors.white} />
                </View>
              )}
            </View>
            <Text style={styles.dishCardPrice}>₹{item.price}</Text>
            <Text style={styles.dishCardRes} numberOfLines={1}>from Best Restaurant</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <View style={styles.sidebarSection}>
        <View style={styles.sidebarHeader}>
          <Filter size={18} color={theme.colors.text} />
          <Text style={styles.sidebarTitle}>Filters</Text>
        </View>
        {filters.map(filter => (
          <TouchableOpacity key={filter} style={styles.sidebarFilterItem}>
            <Text style={styles.sidebarFilterText}>{filter}</Text>
            <ChevronRight size={14} color={theme.colors.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sidebarSection}>
        <Text style={styles.sidebarSubTitle}>Quick Select</Text>
        <View style={styles.quickGrid}>
          {['Veg', 'Non-Veg', '4.5+', 'Express'].map(tag => (
            <TouchableOpacity key={tag} style={styles.quickTag}>
              <Text style={styles.quickTagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.responsiveWrapper}>
        <View style={styles.searchHeader}>
          <View style={styles.searchContainer}>
            <Search size={20} color={theme.colors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Search for restaurants, dishes..."
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <X size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          {!isLargeScreen && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mobileFilters}>
              {filters.map(f => (
                <TouchableOpacity key={f} style={styles.mobileFilterChip}>
                  <Text style={styles.mobileFilterText}>{f}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.contentLayout}>
          {isLargeScreen && renderSidebar()}

          <View style={styles.mainContent}>
            {debouncedQuery.length < 2 ? (
              <ScrollView style={styles.suggestions}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  {recentSearches.map(renderRecentSearch)}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Trending Searches</Text>
                  <View style={styles.trendingGrid}>
                    {trendingSearches.map(renderTrendingSearch)}
                  </View>
                </View>
              </ScrollView>
            ) : (
              <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                  <Text style={styles.statusText}>Searching...</Text>
                ) : data && (data.restaurants.length > 0 || data.foodItems.length > 0) ? (
                  <View style={isLargeScreen ? styles.gridContainer : styles.listContent}>
                    {[...data.restaurants, ...data.foodItems].map(renderResultItem)}
                  </View>
                ) : (
                  <View style={styles.emptyState}>
                    <Search size={64} color={theme.colors.textLight} />
                    <Text style={styles.emptyText}>No results found for "{debouncedQuery}"</Text>
                    <Text style={styles.emptySubText}>Try searching for something else</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  responsiveWrapper: {
    flex: 1,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  searchHeader: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
  },
  mobileFilters: {
    marginTop: theme.spacing.md,
  },
  mobileFilterChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  mobileFilterText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  contentLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    padding: theme.spacing.lg,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  sidebarSection: {
    marginBottom: theme.spacing.xl,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
  },
  sidebarSubTitle: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  sidebarFilterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  sidebarFilterText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  quickTag: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quickTagText: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.medium,
  },
  mainContent: {
    flex: 1,
  },
  suggestions: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  recentText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.md,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.round,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  trendingText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
  },
  resultsContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: theme.spacing.lg,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg / 2,
    paddingTop: theme.spacing.lg,
  },
  gridItem: {
    paddingHorizontal: theme.spacing.lg / 2,
    marginBottom: theme.spacing.lg,
  },
  mobileItem: {
    width: '100%',
  },
  cardSizing: {
    height: 300,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  statusText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xxl,
    marginTop: 50,
  },
  emptyText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
  },
  emptySubText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  dishCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  dishCardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  dishCardContent: {
    padding: theme.spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  dishCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishCardName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
    marginRight: 4,
  },
  dishRating: {
    backgroundColor: theme.colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  dishRatingText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
  },
  dishCardPrice: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
    marginTop: 4,
  },
  dishCardRes: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    marginTop: 2,
  }
});
