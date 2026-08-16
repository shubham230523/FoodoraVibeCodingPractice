import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storageService } from '../services/storage/storageService';
import { Order, OrderStatus } from '../types/order';

const customStorage = {
  getItem: (name: string) => storageService.getItem(name),
  setItem: (name: string, value: any) => storageService.setItem(name, value),
  removeItem: (name: string) => storageService.removeItem(name),
};

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => Order | undefined;
  getActiveOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({ orders: [order, ...state.orders] }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        }));
      },

      getOrder: (orderId) => {
        return get().orders.find((o) => o.id === orderId);
      },

      getActiveOrders: () => {
        return get().orders.filter(
          (o) => o.status !== OrderStatus.DELIVERED && o.status !== OrderStatus.CANCELLED
        );
      },
    }),
    {
      name: 'foodora-order-storage',
      storage: createJSONStorage(() => customStorage as any),
    }
  )
);
