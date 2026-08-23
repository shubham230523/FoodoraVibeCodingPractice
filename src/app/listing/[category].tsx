import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../theme/theme';
import { useRestaurants } from '../../features/restaurant/hooks/useRestaurants';
import { RestaurantCard } from '../../components/restaurant/RestaurantCard';
import { ChevronLeft } from 'lucide-react-native';
import { useResponsive } from '../../hooks/useResponsive';

export default function CategoryListingScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const router = useRouter();
  const { isLargeScreen, width } = useResponsive();
  const { data: restaurants, isLoading } = useRestaurants();

  const numColumns = isLargeScreen ? (width > 1400 ? 3 : 2) : 1;

  // Filter restaurants by category (mock logic)
  const filteredRestaurants = restaurants?.filter(r =>
    r.cuisines.some(c => c.toLowerCase().includes(category?.toLowerCase() || ''))
  ) || restaurants;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.responsiveWrapper}>
          <View style={styles.section}>
            {isLoading ? (
              <Text style={styles.loadingText}>Loading restaurants...</Text>
            ) : (
              <View style={isLargeScreen ? styles.gridContainer : null}>
                {filteredRestaurants?.map((restaurant) => (
                  <View
                    key={restaurant.id}
                    style={isLargeScreen ? [styles.gridItem, { width: `${100 / numColumns}%` }] : null}
                  >
                    <RestaurantCard
                      restaurant={restaurant}
                      onPress={() => router.push(`/restaurant/${restaurant.id}`)}
                      style={!isLargeScreen ? { marginHorizontal: theme.spacing.lg } : undefined}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
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
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    marginRight: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textTransform: 'capitalize',
  },
  responsiveWrapper: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    paddingVertical: theme.spacing.xl,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg / 2,
  },
  gridItem: {
    paddingHorizontal: theme.spacing.lg / 2,
    marginBottom: theme.spacing.md,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  }
});
