import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '../../restaurant/services/restaurantApi';

export const useMenu = (restaurantId: string) => {
  return useQuery({
    queryKey: ['menu', restaurantId],
    queryFn: () => restaurantApi.getMenu(restaurantId),
    enabled: !!restaurantId,
  });
};
