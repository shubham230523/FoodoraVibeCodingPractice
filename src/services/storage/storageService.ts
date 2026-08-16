import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use SecureStore for all platforms since we want persistence.
// Note: SecureStore has a 2048-byte limit for keys on Android.
// For larger data, we would normally use AsyncStorage, but since that's failing,
// we'll use a memory-based fallback for web or if SecureStore fails.

const memoryStorage: Record<string, string> = {};

export const storageService = {
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      if (Platform.OS === 'web') {
        localStorage.setItem(key, jsonValue);
      } else {
        await SecureStore.setItemAsync(key, jsonValue);
      }
    } catch (e) {
      console.error('Error saving to storage', e);
      memoryStorage[key] = JSON.stringify(value);
    }
  },

  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      let jsonValue: string | null = null;
      if (Platform.OS === 'web') {
        jsonValue = localStorage.getItem(key);
      } else {
        jsonValue = await SecureStore.getItemAsync(key);
      }

      if (!jsonValue) {
        jsonValue = memoryStorage[key] || null;
      }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error reading from storage', e);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
      } else {
        await SecureStore.deleteItemAsync(key);
      }
      delete memoryStorage[key];
    } catch (e) {
      console.error('Error removing from storage', e);
    }
  },

  clear: async (): Promise<void> => {
    // SecureStore doesn't have a clear all, so we'd need to track keys.
    // For this app, we'll just clear the memory and web storage.
    if (Platform.OS === 'web') {
      localStorage.clear();
    }
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
  }
};
