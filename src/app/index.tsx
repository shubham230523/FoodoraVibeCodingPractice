import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRootNavigationState, Redirect } from 'expo-router';
import { theme } from '../theme/theme';
import { Logo } from '../components/common/Logo';

export default function Index() {
  const rootNavigationState = useRootNavigationState();
  const [showSplash, setShowSplash] = useState(true);
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    // Keep splash visible for at least 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    // Show fallback button if navigation hangs
    const retryTimer = setTimeout(() => {
      setShowRetry(true);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(retryTimer);
    };
  }, []);

  const SplashUI = () => (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false, title: '' }} />
      <View style={styles.content}>
        <Logo size="xl" textColor={theme.colors.white} />
        <Text style={styles.tagline}>Good food. Delivered.</Text>

        {showRetry && (
          <TouchableOpacity
            onPress={() => setShowSplash(false)}
            style={styles.retryBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>Enter Application</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // 1. Wait for router to be ready
  if (!rootNavigationState?.key) {
    return <SplashUI />;
  }

  // 2. Wait for splash timer
  if (showSplash) {
    return <SplashUI />;
  }

  // 3. Perform robust redirect
  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5A5F',
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
  retryBtn: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryText: {
    color: '#FF5A5F',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
