import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { Restaurant } from '../../types/restaurant';
import { Card } from '../common/Card';
import { RatingBadge } from '../common/RatingBadge';
import { Clock, MapPin, Heart } from 'lucide-react-native';
import { useFavoriteStore } from '../../store/favoriteStore';
import { ImageWithPlaceholder } from '../common/ImageWithPlaceholder';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  style?: ViewStyle;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress, style }) => {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const favorite = isFavorite(restaurant.id);

  const imageSource = React.useMemo(() => ({ uri: restaurant.image }), [restaurant.image]);
  const bestOffer = restaurant.offers.length > 0 ? restaurant.offers[0] : null;

  return (
    <Card style={[styles.container, style]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <ImageWithPlaceholder source={imageSource} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(restaurant.id)}
        >
          <Heart
            size={20}
            color={favorite ? theme.colors.primary : theme.colors.white}
            fill={favorite ? theme.colors.primary : 'rgba(0,0,0,0.3)'}
          />
        </TouchableOpacity>
        {bestOffer && (
          <View style={styles.offerBadge}>
            <Text style={styles.offerText}>{bestOffer.title}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <RatingBadge rating={restaurant.rating} />
        </View>

        <Text style={styles.cuisines} numberOfLines={1}>
          {restaurant.cuisines.join(', ')}
        </Text>

        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{restaurant.deliveryTime} mins</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.infoItem}>
            <Text style={styles.infoText}>₹{restaurant.priceForTwo} for two</Text>
          </View>
          <View style={styles.dot} />
          <View style={styles.infoItem}>
            <MapPin size={14} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{restaurant.distance} km</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: theme.spacing.xs,
  },
  offerBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderTopRightRadius: theme.radius.sm,
  },
  offerText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  cuisines: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.textLight,
    marginHorizontal: 8,
  },
});
