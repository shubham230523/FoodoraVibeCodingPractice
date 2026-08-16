import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  style,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary': return { backgroundColor: theme.colors.surface, color: theme.colors.textSecondary };
      case 'success': return { backgroundColor: '#E8F5E9', color: theme.colors.success };
      case 'warning': return { backgroundColor: '#FFF9C4', color: '#FBC02D' };
      case 'error': return { backgroundColor: '#FFEBEE', color: theme.colors.error };
      case 'info': return { backgroundColor: '#E3F2FD', color: '#1976D2' };
      default: return { backgroundColor: '#FFEBEF', color: theme.colors.primary };
    }
  };

  const variantStyle = getVariantStyle();

  return (
    <View style={[styles.container, { backgroundColor: variantStyle.backgroundColor }, style]}>
      <Text style={[styles.text, { color: variantStyle.color }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.xs,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
  },
});
