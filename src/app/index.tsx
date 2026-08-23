import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { theme } from '../theme/theme';
import { Logo } from '../components/common/Logo';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Foodora', headerShown: false }} />
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
        alignItems: 'center'
      }}>
        <Logo size="xl" textColor={theme.colors.white} style={styles.logo} />
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            Good food. Delivered.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  taglineContainer: {
    marginTop: 10,
  },
  tagline: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.medium,
    opacity: 0.9,
  },
});
