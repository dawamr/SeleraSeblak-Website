export interface MenuItem {
  id: string;
  image: string;
  name: string;
  basePrice: number;
  description: string;
  spicyLevel: number;
  category: 'seblak' | 'mie' | 'burger';
}

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface SpicyLevel {
  id: string;
  name: string;
  level: number;
  price: number;
}

export const menuItems: MenuItem[] = [
  {
    id: '1',
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80",
    name: "Seblak Original",
    basePrice: 25000,
    description: "Seblak klasik dengan kerupuk, bakso, mie, dan telur dalam kuah pedas khas",
    spicyLevel: 3,
    category: 'seblak'
  },
  {
    id: '2',
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80",
    name: "Mie Pedas Gila",
    basePrice: 28000,
    description: "Mie dengan bumbu super pedas, topping ayam, dan sayuran segar",
    spicyLevel: 5,
    category: 'mie'
  },
  {
    id: '3',
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80",
    name: "Burger Seblak",
    basePrice: 35000,
    description: "Inovasi burger dengan saus seblak pedas dan kerupuk crispy",
    spicyLevel: 4,
    category: 'burger'
  },
  {
    id: '4',
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80",
    name: "Seblak Seafood",
    basePrice: 32000,
    description: "Seblak dengan campuran seafood segar dalam kuah pedas",
    spicyLevel: 4,
    category: 'seblak'
  },
  {
    id: '5',
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80",
    name: "Mie Goreng Seblak",
    basePrice: 27000,
    description: "Mie goreng dengan bumbu seblak dan topping lengkap",
    spicyLevel: 3,
    category: 'mie'
  }
];

export const toppings: Topping[] = [
  { id: '1', name: 'Telur', price: 5000 },
  { id: '2', name: 'Bakso', price: 7000 },
  { id: '3', name: 'Sosis', price: 7000 },
  { id: '4', name: 'Crabstick', price: 8000 },
  { id: '5', name: 'Kerupuk', price: 3000 },
  { id: '6', name: 'Sayuran', price: 4000 }
];

export const spicyLevels: SpicyLevel[] = [
  { id: '1', name: 'Normal', level: 1, price: 0 },
  { id: '2', name: 'Pedas', level: 2, price: 2000 },
  { id: '3', name: 'Extra Pedas', level: 3, price: 4000 },
  { id: '4', name: 'Gila', level: 4, price: 6000 },
  { id: '5', name: 'Mati Rasa', level: 5, price: 8000 }
];
