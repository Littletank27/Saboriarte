import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { OrderForm } from './OrderForm';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tu Pedido</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-green-400">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 p-2 hover:bg-gray-700 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {showOrderForm ? (
              <OrderForm onBack={() => setShowOrderForm(false)} />
            ) : (
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Continuar con el pedido
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};