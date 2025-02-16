import React, { useState } from 'react';
import { Flame, X } from 'lucide-react';
import { getImageUrl } from '../utils/image';
import { sanitizeHtml } from '../utils/sanitize';

interface MenuItem {
  name: string;
  price: string;
  description: string;
  spicyLevel: number;
  photo?: string;
}

const menuItems: MenuItem[] = [
  {
    photo: 'https://seleraseblak.com/r-eris-8SRfhNf6z9s-unsplash.jpg',
    name: 'Seblak Signature',
    price: 'Rp 12.500*',
    description: 'Seblak dengan aneka topping, dan bumbu khas dalam kenikmatan kuah pedas nan khas',
    spicyLevel: 5,
  },
  {
    photo: 'https://seleraseblak.com/photo-1585032226651-759b368d7246.jpeg',
    name: 'Mie Pedas Gila',
    price: 'Rp 12.500*',
    description: 'Mie dengan bumbu super pedas, dengan topping ayam, dan sayuran segar',
    spicyLevel: 5,
  },
  {
    photo: 'https://seleraseblak.com/photo-1568901346375-23c9450c58cd.jpeg',
    name: 'Burger',
    price: 'Rp 12.500*',
    description: 'Inovasi burger dengan daging yang diolah dengan bumbu khas yang nikmat',
    spicyLevel: 5,
  },
];

export default function Menu() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id='menu' className='py-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-4xl font-bold text-center mb-12'>Menu Favorit</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {menuItems.map((dish, index) => (
            <div
              key={index}
              className='bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform'
              onClick={() => {
                setSelectedDish(dish);
                setIsModalOpen(true);
              }}
            >
              <img src={dish.photo} alt={dish.name} className='w-full h-48 object-cover' />
              <div className='p-6'>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold mb-1'>{dish.name}</h3>
                  <p className='text-gray-600 mb-1'>{dish.price}</p>
                  <div
                    className='text-gray-500 text-sm'
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(dish.description) }}
                  />
                  <div className='flex mt-2'>
                    {[...Array(dish.spicyLevel)].map((_, i) => (
                      <Flame key={i} className='w-4 h-4 text-red-600' />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedDish && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg max-w-2xl w-full mx-4'>
            <div className='relative'>
              <img src={selectedDish.photo} alt={selectedDish.name} className='w-full h-64 object-cover rounded-t-lg' />
              <button
                onClick={() => setIsModalOpen(false)}
                className='absolute top-4 right-4 bg-white rounded-full p-1'
              >
                <X className='w-6 h-6' />
              </button>
            </div>
            <div className='p-6'>
              <h3 className='text-2xl font-bold mb-2'>{selectedDish.name}</h3>
              <p className='text-xl text-red-600 mb-4'>{selectedDish.price}</p>
              <div className='flex mb-4'>
                {[...Array(selectedDish.spicyLevel)].map((_, i) => (
                  <Flame key={i} className='w-4 h-4 text-red-600' />
                ))}
              </div>
              <div
                className='text-gray-600 mb-6'
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(selectedDish.description) }}
              />
              <button
                className='w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors'
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
