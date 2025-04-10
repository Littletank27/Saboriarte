export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderFormData {
  name: string;
  address: string;
  paymentMethod: 'cash' | 'transfer';
  comments?: string;
}