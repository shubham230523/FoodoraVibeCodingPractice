import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { Star } from 'lucide-react-native';

interface RatingBadgeProps {
  rating: number;
  showCount?: boolean;
  count?: number;
  style?: ViewStyle;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  showCount = false,
  count,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.badge}>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        <Star size={12} color={theme.colors.white} fill={theme.colors.white} />
      </View>
      {showCount && count !== undefined && (
        <Text style={styles.countText}>({count > 999 ? '1k+' : count})</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.radius.xs,
  },
  ratingText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: 2,
  },
  countText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.xs,
    marginLeft: theme.spacing.xs,
  },
});
