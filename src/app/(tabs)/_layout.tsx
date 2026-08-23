import { Tabs } from 'expo-router';
import { theme } from '../../theme/theme';
import { Home, Search, ShoppingBag, User } from 'lucide-react-native';
import { useResponsive } from '../../hooks/useResponsive';
import { View, StyleSheet, Platform } from 'react-native';
import { SideNavigation } from '../../components/navigation/SideNavigation';

export default function TabLayout() {
  const { isLargeScreen } = useResponsive();

  return (
    <View style={styles.container}>
      {isLargeScreen && <SideNavigation />}
      <View style={styles.content}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.textSecondary,
            tabBarStyle: isLargeScreen ? { display: 'none' } : {
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.border,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: 'Orders',
              tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});
