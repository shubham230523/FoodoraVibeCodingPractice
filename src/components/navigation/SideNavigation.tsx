import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { theme } from '../../theme/theme';
import { Home, Search, ShoppingBag, User } from 'lucide-react-native';
import { Logo } from '../common/Logo';

export const SideNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Orders', path: '/orders', icon: ShoppingBag },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size="md" />
      </View>

      <View style={styles.navItems}>
        {navItems.map((item) => {
          const isActive = pathname.includes(item.path);
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => router.push(`/(tabs)${item.path}`)}
            >
              <Icon
                size={24}
                color={isActive ? theme.colors.primary : theme.colors.textSecondary}
              />
              <Text style={[styles.navText, isActive && styles.activeNavText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: theme.colors.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    paddingHorizontal: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
  },
  navItems: {
    gap: theme.spacing.sm,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  activeNavItem: {
    backgroundColor: theme.colors.primary + '10', // 10% opacity
    borderRightWidth: 3,
    borderRightColor: theme.colors.primary,
  },
  navText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  activeNavText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
