export interface MenuItem {
  id: string;
  image: string;
  photo?: string; // ID foto dari CMS
  name: string;
  basePrice: number;
  description: string; // Contains HTML
  spicyLevel: number;
  category: 'seblak' | 'mie' | 'burger';
  toppings: Topping[]; // Sesuaikan dengan API
}

export interface Topping {
  id: number;
  name: string;
  price: number;
  status: string;
  date_created: string;
  date_updated: string;
}

export interface SpicyLevel {
  id: string;
  name: string;
  level: number;
  price: number;
}

// Menambahkan interface untuk API responses
export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

// Mengubah menuItems, toppings, dan spicyLevels menjadi async functions
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const { menuService } = await import('../services/api');
  // Gunakan store default atau ambil dari config
  return menuService.getMenuItemsByStore('82fb0716-b744-40b7-aea5-2549443f2dd4');
};

export const getToppings = async (): Promise<Topping[]> => {
  const { menuService } = await import('../services/api');
  return menuService.getToppings();
};

export const getSpicyLevels = async (): Promise<SpicyLevel[]> => {
  const { menuService } = await import('../services/api');
  return menuService.getSpicyLevels();
};
