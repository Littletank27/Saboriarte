import React, { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import type { OrderFormData } from '../types';

interface OrderFormProps {
  onBack: () => void;
}

const ALIAS = 'aliasdeejemplo';

export const OrderForm: React.FC<OrderFormProps> = ({ onBack }) => {
  const { items, total, clearCart } = useCartStore();
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    address: '',
    paymentMethod: 'cash',
    comments: '',
  });
  const [aliasCopied, setAliasCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const itemsList = items
      .map((item) => `${item.quantity}x ${item.name}`)
      .join('\n');

    const message = `
*Nuevo Pedido*
*Cliente:* ${formData.name}
*Dirección:* ${formData.address}
*Método de Pago:* ${formData.paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}

*Pedido:*
${itemsList}

*Total:* $${total}

${formData.comments ? `*Comentarios:* ${formData.comments}` : ''}
    `.trim();

    const whatsappUrl = `https://wa.me/3876328644?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  const copyAlias = async () => {
    await navigator.clipboard.writeText(ALIAS);
    setAliasCopied(true);
    setTimeout(() => setAliasCopied(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al carrito
      </button>

      <div>
        <label className="block text-sm font-medium mb-2">
          Nombre y Apellido
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Dirección de entrega
        </label>
        <input
          type="text"
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Método de Pago
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={(e) => setFormData({ ...formData, paymentMethod: 'cash' })}
              className="text-green-500 focus:ring-green-500"
            />
            <span>Efectivo</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              value="transfer"
              checked={formData.paymentMethod === 'transfer'}
              onChange={(e) => setFormData({ ...formData, paymentMethod: 'transfer' })}
              className="text-green-500 focus:ring-green-500"
            />
            <span>Transferencia</span>
          </label>
        </div>
      </div>

      {formData.paymentMethod === 'transfer' && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium">Alias: {ALIAS}</span>
            <button
              type="button"
              onClick={copyAlias}
              className="flex items-center text-green-500 hover:text-green-400"
            >
              {aliasCopied ? (
                <Check className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">
          Comentarios adicionales
        </label>
        <textarea
          value={formData.comments}
          onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
          className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
      >
        Enviar Pedido por WhatsApp
      </button>
    </form>
  );
};