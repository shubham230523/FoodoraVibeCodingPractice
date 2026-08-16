import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';
import { Search, X, ChevronLeft, Clock, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSearch } from '../../features/search/hooks/useSearch';
import { RestaurantCard } from '../../components/restaurant/RestaurantCard';

export default function SearchScreen() {
  const router = useRouter();
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

  const renderResult = ({ item }: { item: any }) => {
    // Check if it's a restaurant or a dish (mock data search returns both)
    if ('cuisines' in item) {
      return (
        <RestaurantCard
          restaurant={item}
          onPress={() => router.push(`/restaurant/${item.id}`)}
        />
      );
    }

    // Dish result
    return (
      <TouchableOpacity
        style={styles.dishResult}
        onPress={() => router.push(`/restaurant/${item.restaurantId}`)}
      >
        <Image source={{ uri: item.image }} style={styles.dishImage} />
        <View style={styles.dishInfo}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.dishPrice}>₹{item.price}</Text>
          <Text style={styles.dishResName}>from Best Restaurant</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
      </View>

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
        <View style={styles.resultsContainer}>
          {isLoading ? (
            <Text style={styles.statusText}>Searching...</Text>
          ) : data && (data.restaurants.length > 0 || data.foodItems.length > 0) ? (
            <FlatList
              data={[...data.restaurants, ...data.foodItems]}
              keyExtractor={(item) => item.id}
              renderItem={renderResult}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyState}>
              <Search size={64} color={theme.colors.textLight} />
              <Text style={styles.emptyText}>No results found for "{debouncedQuery}"</Text>
              <Text style={styles.emptySubText}>Try searching for something else</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchHeader: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
  dishResult: {
    flexDirection: 'row',
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dishImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.sm,
  },
  dishInfo: {
    marginLeft: theme.spacing.md,
    justifyContent: 'center',
  },
  dishName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  dishPrice: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  dishResName: {
    fontSize: 10,
    color: theme.colors.textSecondary,
  }
});
