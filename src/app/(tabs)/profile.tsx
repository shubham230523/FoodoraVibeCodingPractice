import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../theme/theme';
import { useUserStore } from '../../store/userStore';
import {
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  ChevronLeft
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUserStore();

  const menuItems = [
    { icon: <ShoppingBag size={20} color={theme.colors.textSecondary} />, title: 'My Orders', onPress: () => router.push('/(tabs)/orders') },
    { icon: <MapPin size={20} color={theme.colors.textSecondary} />, title: 'Addresses', onPress: () => router.push('/address') },
    { icon: <Heart size={20} color={theme.colors.textSecondary} />, title: 'Favorites', onPress: () => {} },
    { icon: <Settings size={20} color={theme.colors.textSecondary} />, title: 'Settings', onPress: () => {} },
    { icon: <HelpCircle size={20} color={theme.colors.textSecondary} />, title: 'Help & Support', onPress: () => {} },
    { icon: <Info size={20} color={theme.colors.textSecondary} />, title: 'About Foodora', onPress: () => {} },
  ];

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            <View style={styles.userDetails}>
              <Text style={styles.userName} numberOfLines={1}>{user.name}</Text>
              <Text style={styles.userMeta} numberOfLines={1}>
                {user.phone} • {user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuLeft}>
                {item.icon}
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Foodora v1.0.0</Text>
          <Text style={styles.madeWithText}>Made with ❤️ for Foodies</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.md,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.surface,
  },
  userDetails: {
    marginLeft: theme.spacing.lg,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  userMeta: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  editBtn: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.radius.xs,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  editBtnText: {
    color: theme.colors.primary,
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
  },
  menuContainer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    marginLeft: theme.spacing.lg,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  logoutText: {
    marginLeft: theme.spacing.lg,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.error,
  },
  footer: {
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  madeWithText: {
    fontSize: 10,
    color: theme.colors.textLight,
    marginTop: 4,
  }
});
