import { MenuItem, Topping, SpicyLevel } from '../types/menu';
import { Store } from '../types/store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const isDevelopment = import.meta.env.DEV;

// Tambahkan logging untuk debug
console.log('API URL:', API_URL);
console.log('Environment:', isDevelopment ? 'development' : 'production');

export const menuService = {
  async getToppings(): Promise<Topping[]> {
    try {
      const response = await fetch(`${API_URL}/toppings`);
      if (!response.ok) throw new Error('Failed to fetch toppings');
      return response.json();
    } catch (error) {
      console.error('Error fetching toppings:', error);
      throw error;
    }
  },

  async getSpicyLevels(): Promise<SpicyLevel[]> {
    try {
      const response = await fetch(`${API_URL}/spicy-levels`);
      if (!response.ok) throw new Error('Failed to fetch spicy levels');
      return response.json();
    } catch (error) {
      console.error('Error fetching spicy levels:', error);
      throw error;
    }
  },

  async getStores(): Promise<Store[]> {
    try {
      const response = await fetch(`${API_URL}/stores`);
      if (!response.ok) throw new Error('Failed to fetch stores');
      const data = await response.json();
      console.log('Raw store data:', data);

      return data.map((store: any) => ({
        id: store.id,
        store_name: store.store_name || '',
        store_address: store.store_address || '',
        store_phone: store.store_phone || '',
      }));
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  async getMenuItemsByStore(storeId: string): Promise<MenuItem[]> {
    try {
      const response = await fetch(`${API_URL}/stores/${storeId}/products`);
      if (!response.ok) throw new Error('Failed to fetch menu items');
      const products = await response.json();

      // Pastikan products adalah array
      if (!Array.isArray(products)) {
        console.error('Expected array of products, got:', products);
        return [];
      }

      return products.map(transformProductToMenuItem);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  },
};

// Helper untuk transformasi
function transformProductToMenuItem(product: any): MenuItem {
  if (!product || !product.product_master) {
    console.error('Invalid product data:', product);
    return {
      id: String(product?.id || ''),
      image: '',
      photo: product?.photo || undefined,
      name: product?.product_master?.product_name || 'Unknown Product',
      basePrice: product?.price || 0,
      description: product?.product_master?.description || '',
      spicyLevel: product?.product_master?.spicy_level || 0,
      category: product?.product_master?.category?.[0] || 'seblak',
      toppings: product?.toppings || [],
    };
  }

  return {
    id: String(product.id),
    image: '',
    photo: product.photo || undefined,
    name: product.product_master.product_name,
    basePrice: product.price,
    description: product.product_master.description,
    spicyLevel: product.product_master.spicy_level || 0,
    category: product.product_master.category?.[0] || 'seblak',
    toppings: product.toppings || [],
  };
}
