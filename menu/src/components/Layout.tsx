import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Cart } from './Cart';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-lg z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Saboriarte</h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 pt-20 pb-8">{children}</main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};