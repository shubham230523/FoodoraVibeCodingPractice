export type Offer = {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercentage?: number;
  flatDiscount?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
};

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisines: string[];
  deliveryTime: number;
  priceForTwo: number;
  distance: number;
  isPureVeg: boolean;
  offers: Offer[];
  address: string;
  description?: string;
};
