export type FoodCustomizationOption = {
  id: string;
  name: string;
  price: number;
};

export type FoodCustomization = {
  id: string;
  title: string;
  isRequired: boolean;
  minSelection?: number;
  maxSelection?: number;
  options: FoodCustomizationOption[];
};

export type FoodItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isVeg: boolean;
  rating?: number;
  isPopular?: boolean;
  customizations?: FoodCustomization[];
};
