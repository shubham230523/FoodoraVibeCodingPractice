import { mockFetch } from '../../../services/api/client';
import { restaurants } from '../../../data/restaurants';
import { allFoodItems } from '../../../data/foodItems';
import { Restaurant } from '../../../types/restaurant';
import { FoodItem } from '../../../types/food';

export const restaurantApi = {
  getRestaurants: async (): Promise<Restaurant[]> => {
    return mockFetch(restaurants);
  },

  getRestaurant: async (id: string): Promise<Restaurant | undefined> => {
    const restaurant = restaurants.find(r => r.id === id);
    return mockFetch(restaurant);
  },

  getMenu: async (restaurantId: string): Promise<FoodItem[]> => {
    const menu = allFoodItems.filter(item => item.restaurantId === restaurantId);
    return mockFetch(menu);
  },

  search: async (query: string): Promise<{ restaurants: Restaurant[], foodItems: FoodItem[] }> => {
    const q = query.toLowerCase();
    const filteredRestaurants = restaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisines.some(c => c.toLowerCase().includes(q))
    );
    const filteredFoodItems = allFoodItems.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );

    return mockFetch({
      restaurants: filteredRestaurants,
      foodItems: filteredFoodItems
    });
  }
};
