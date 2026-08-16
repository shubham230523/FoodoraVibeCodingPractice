import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storageService } from '../services/storage/storageService';
import { CartItem } from '../types/cart';
import { Offer } from '../types/restaurant';
import { calculateSubtotal, calculateDeliveryFee, calculateTax, calculateDiscount, calculateTotal } from '../utils/priceUtils';

// Custom storage wrapper for Zustand to use our storageService
const customStorage = {
  getItem: (name: string) => storageService.getItem(name),
  setItem: (name: string, value: any) => storageService.setItem(name, value),
  removeItem: (name: string) => storageService.removeItem(name),
};

interface CartState {
  restaurantId: string | null;
  restaurantName: string | null;
  restaurantImage: string | null;
  items: CartItem[];
  appliedCoupon: Offer | null;

  addItem: (item: CartItem, restaurantInfo: { id: string, name: string, image: string }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Offer) => void;
  removeCoupon: () => void;

  getTotals: () => {
    subtotal: number;
    deliveryFee: number;
    tax: number;
    discount: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      restaurantName: null,
      restaurantImage: null,
      items: [],
      appliedCoupon: null,

      addItem: (newItem, restaurantInfo) => {
        const { restaurantId, items } = get();

        if (restaurantId && restaurantId !== restaurantInfo.id) {
          set({
            restaurantId: restaurantInfo.id,
            restaurantName: restaurantInfo.name,
            restaurantImage: restaurantInfo.image,
            items: [newItem],
            appliedCoupon: null
          });
          return;
        }

        const existingItemIndex = items.findIndex(item => item.id === newItem.id);

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({
            restaurantId: restaurantInfo.id,
            restaurantName: restaurantInfo.name,
            restaurantImage: restaurantInfo.image,
            items: [...items, newItem]
          });
        }
      },

      removeItem: (itemId) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== itemId);

        if (updatedItems.length === 0) {
          set({
            items: [],
            restaurantId: null,
            restaurantName: null,
            restaurantImage: null,
            appliedCoupon: null
          });
        } else {
          set({ items: updatedItems });
        }
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const updatedItems = items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          restaurantName: null,
          restaurantImage: null,
          appliedCoupon: null
        });
      },

      applyCoupon: (coupon) => {
        set({ appliedCoupon: coupon });
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      getTotals: () => {
        const { items, appliedCoupon } = get();
        const subtotal = calculateSubtotal(items);
        const deliveryFee = calculateDeliveryFee(subtotal);
        const tax = calculateTax(subtotal);
        const discount = calculateDiscount(subtotal, appliedCoupon || undefined);
        const total = calculateTotal(subtotal, deliveryFee, tax, discount);

        return { subtotal, deliveryFee, tax, discount, total };
      }
    }),
    {
      name: 'foodora-cart-storage',
      storage: createJSONStorage(() => customStorage as any),
    }
  )
);
