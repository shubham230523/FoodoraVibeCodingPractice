import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storageService } from '../services/storage/storageService';

const customStorage = {
  getItem: (name: string) => storageService.getItem(name),
  setItem: (name: string, value: any) => storageService.setItem(name, value),
  removeItem: (name: string) => storageService.removeItem(name),
};

interface FavoriteState {
  favoriteRestaurantIds: string[];
  toggleFavorite: (restaurantId: string) => void;
  isFavorite: (restaurantId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteRestaurantIds: [],

      toggleFavorite: (restaurantId) => {
        const { favoriteRestaurantIds } = get();
        if (favoriteRestaurantIds.includes(restaurantId)) {
          set({ favoriteRestaurantIds: favoriteRestaurantIds.filter(id => id !== restaurantId) });
        } else {
          set({ favoriteRestaurantIds: [...favoriteRestaurantIds, restaurantId] });
        }
      },

      isFavorite: (restaurantId) => {
        return get().favoriteRestaurantIds.includes(restaurantId);
      },
    }),
    {
      name: 'foodora-favorite-storage',
      storage: createJSONStorage(() => customStorage as any),
    }
  )
);
