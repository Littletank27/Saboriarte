import { create } from 'zustand';
import { CartItem, MenuItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item: MenuItem) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  removeItem: (itemId: string) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
      total: state.total - (state.items.find((i) => i.id === itemId)?.price ?? 0),
    })),
  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;
      const difference = quantity - item.quantity;
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
        total: state.total + item.price * difference,
      };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));