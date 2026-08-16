export type SelectedCustomization = {
  customizationId: string;
  customizationTitle: string;
  optionId: string;
  optionName: string;
  price: number;
};

export type CartItem = {
  id: string; // Unique ID for the cart entry (e.g., foodId + customization hash)
  foodId: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  customizations: SelectedCustomization[];
};
