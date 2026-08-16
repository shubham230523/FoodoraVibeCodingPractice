import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '../services/restaurantApi';

export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: () => restaurantApi.getRestaurants(),
  });
};

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantApi.getRestaurant(id),
    enabled: !!id,
  });
};
