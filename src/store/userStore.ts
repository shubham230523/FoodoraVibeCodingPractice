import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storageService } from '../services/storage/storageService';
import { User } from '../types/user';
import { Address } from '../types/address';
import { currentUser, mockAddresses } from '../data/users';

const customStorage = {
  getItem: (name: string) => storageService.getItem(name),
  setItem: (name: string, value: any) => storageService.setItem(name, value),
  removeItem: (name: string) => storageService.removeItem(name),
};

interface UserState {
  user: User | null;
  addresses: Address[];
  selectedAddressId: string | null;

  setUser: (user: User | null) => void;
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  getSelectedAddress: () => Address | undefined;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: currentUser,
      addresses: mockAddresses,
      selectedAddressId: mockAddresses[0]?.id || null,

      setUser: (user) => set({ user }),

      addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),

      updateAddress: (address) => set((state) => ({
        addresses: state.addresses.map((a) => (a.id === address.id ? address : a)),
      })),

      deleteAddress: (id) => set((state) => ({
        addresses: state.addresses.filter((a) => a.id !== id),
        selectedAddressId: state.selectedAddressId === id ? null : state.selectedAddressId
      })),

      selectAddress: (id) => set({ selectedAddressId: id }),

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        return addresses.find(a => a.id === selectedAddressId);
      }
    }),
    {
      name: 'foodora-user-storage',
      storage: createJSONStorage(() => customStorage as any),
    }
  )
);
