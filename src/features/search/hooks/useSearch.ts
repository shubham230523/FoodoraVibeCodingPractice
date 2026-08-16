import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '../../restaurant/services/restaurantApi';

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => restaurantApi.search(query),
    enabled: query.length >= 2,
  });
};
