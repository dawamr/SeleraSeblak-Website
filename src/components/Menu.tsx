import React, { useState } from 'react';
import { Flame, X } from 'lucide-react';

interface MenuItem {
  image: string;
  name: string;
  price: string;
  description: string;
  spicyLevel: number;
}

const menuItems: MenuItem[] = [
  {
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80",
    name: "Seblak Original",
    price: "Rp 25.000",
    description: "Seblak klasik dengan kerupuk, bakso, mie, dan telur dalam kuah pedas khas",
    spicyLevel: 3
  },
  {
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80",
    name: "Mie Pedas Gila",
    price: "Rp 28.000",
    description: "Mie dengan bumbu super pedas, topping ayam, dan sayuran segar",
    spicyLevel: 5
  },
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80",
    name: "Burger Seblak",
    price: "Rp 35.000",
    description: "Inovasi burger dengan saus seblak pedas dan kerupuk crispy",
    spicyLevel: 4
  }
];

export default function Menu() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Menu Favorit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((dish, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform"
              onClick={() => {
                setSelectedDish(dish);
                setIsModalOpen(true);
              }}
            >
              <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <p className="text-gray-600">{dish.price}</p>
                <div className="flex mt-2">
                  {[...Array(dish.spicyLevel)].map((_, i) => (
                    <Flame key={i} className="w-4 h-4 text-red-600" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
            <div className="relative">
              <img 
                src={selectedDish.image} 
                alt={selectedDish.name} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white rounded-full p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedDish.name}</h3>
              <p className="text-xl text-red-600 mb-4">{selectedDish.price}</p>
              <div className="flex mb-4">
                {[...Array(selectedDish.spicyLevel)].map((_, i) => (
                  <Flame key={i} className="w-4 h-4 text-red-600" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{selectedDish.description}</p>
              <button 
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
