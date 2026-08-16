import { CartItem } from './cart';

export enum OrderStatus {
  PLACED = 'PLACED',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export type PaymentMethod = 'COD' | 'UPI' | 'CARD';

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string; // Added for convenience in history
  restaurantImage: string; // Added for convenience in history
  items: CartItem[];
  addressId: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
};
