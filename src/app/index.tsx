import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { theme } from '../theme/theme';
import { Logo } from '../components/common/Logo';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Navigating to home...');
      router.replace('/(tabs)/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: '' }} />
      <View style={styles.content}>
        <Logo size="xl" textColor={theme.colors.white} />
        <Text style={styles.tagline}>Good food. Delivered.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5A5F', // Hardcoded primary color to ensure immediate visibility
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  tagline: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    opacity: 0.9,
    fontWeight: '500',
  },
});
