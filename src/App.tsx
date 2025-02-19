import React, { useState } from 'react';
import {
  Menu,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  PiIcon as ChiliIcon,
  Smartphone,
  Handshake,
  X,
} from 'lucide-react';

interface MenuItem {
  image: string;
  name: string;
  price: string;
  description: string;
  spicyLevel: number;
}

function App() {
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      image: 'https://cms.seleraseblak.com/assets/6d79f304-aeb8-4f62-a8ee-54540ccc2ac7?width=300',
      name: 'Seblak Original',
      price: 'Rp 25.000',
      description: 'Seblak klasik dengan kerupuk, bakso, mie, dan telur dalam kuah pedas khas',
      spicyLevel: 3,
    },
    {
      image: 'https://cms.seleraseblak.com/assets/a61d7309-12e9-47e0-b9cb-495df3f66133?width=300',
      name: 'Mie Pedas Gila',
      price: 'Rp 28.000',
      description: 'Mie dengan bumbu super pedas, topping ayam, dan sayuran segar',
      spicyLevel: 5,
    },
    {
      image: 'https://cms.seleraseblak.com/assets/c345eb6f-b1cb-42cd-84ee-1dd9ed9fd67d?width=300',
      name: 'Burger Seblak',
      price: 'Rp 35.000',
      description: 'Inovasi burger dengan saus seblak pedas dan kerupuk crispy',
      spicyLevel: 4,
    },
  ];

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-2'>
              <ChiliIcon className='h-8 w-8 text-red-600' />
              <span className='font-bold text-2xl'>SeleraSeblak</span>
            </div>
            <div className='hidden md:flex space-x-8'>
              <a href='#menu' className='text-gray-700 hover:text-red-600'>
                Menu
              </a>
              <a href='#about' className='text-gray-700 hover:text-red-600'>
                About
              </a>
              <a href='#app' className='text-gray-700 hover:text-red-600'>
                App
              </a>
              <a href='#partnership' className='text-gray-700 hover:text-red-600'>
                Partnership
              </a>
            </div>
            <div className='md:hidden'>
              <Menu className='h-6 w-6' />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='relative h-screen'>
        <div className='absolute inset-0'>
          <img
            src='https://cms.seleraseblak.com/assets/1740afb4-2dd0-4bfc-b664-a2917223d94d'
            alt='Spicy Food'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50'></div>
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center'>
          <div className='text-white'>
            <h1 className='text-5xl md:text-7xl font-bold mb-4'>
              Pedas Nikmat
              <br />
              Setiap Gigitan
            </h1>
            <p className='text-xl md:text-2xl mb-8'>Rasakan sensasi kenikmatan pada setiap gigitan.</p>
            <button className='bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors'>
              Lihat Menu
            </button>
          </div>
        </div>
      </div>

      {/* Featured Dishes */}
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
                <img src={dish.image} alt={dish.name} className='w-full h-64 object-cover' />
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2'>{dish.name}</h3>
                  <p className='text-gray-600'>{dish.price}</p>
                  <div className='flex mt-2'>
                    {[...Array(dish.spicyLevel)].map((_, i) => (
                      <ChiliIcon key={i} className='w-4 h-4 text-red-600' />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section id='app' className='py-20 bg-red-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='md:w-1/2 mb-8 md:mb-0'>
              <h2 className='text-4xl font-bold mb-4'>Download Aplikasi Kami</h2>
              <p className='text-lg text-gray-600 mb-8'>
                Nikmati kemudahan pesan antar dan promo eksklusif melalui aplikasi SeleraSeblak
              </p>
              <div className='flex space-x-4'>
                <button className='bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2'>
                  <Smartphone className='w-6 h-6' />
                  <span>App Store</span>
                </button>
                <button className='bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2'>
                  <Smartphone className='w-6 h-6' />
                  <span>Play Store</span>
                </button>
              </div>
            </div>
            <div className='md:w-1/2'>
              <img
                src='https://cms.seleraseblak.com/assets/97c52f5f-e9b0-467c-a182-d63c7b88d5a0'
                alt='Mobile App'
                className='rounded-lg shadow-xl'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section id='partnership' className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4'>Mari Bermitra</h2>
            <p className='text-lg text-gray-600'>Bergabunglah dengan keluarga besar SeleraSeblak</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
              <Handshake className='w-12 h-12 mx-auto mb-4 text-red-600' />
              <h3 className='text-xl font-semibold mb-2'>Franchise</h3>
              <p className='text-gray-600'>Buka outlet SeleraSeblak Anda sendiri</p>
            </div>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
              <MapPin className='w-12 h-12 mx-auto mb-4 text-red-600' />
              <h3 className='text-xl font-semibold mb-2'>Lokasi Strategis</h3>
              <p className='text-gray-600'>Dapatkan lokasi premium untuk bisnis Anda</p>
            </div>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
              <ChiliIcon className='w-12 h-12 mx-auto mb-4 text-red-600' />
              <h3 className='text-xl font-semibold mb-2'>Training</h3>
              <p className='text-gray-600'>Pelatihan lengkap untuk tim Anda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <Clock className='w-8 h-8 mx-auto mb-4 text-red-600' />
              <h3 className='text-xl font-semibold mb-2'>Jam Buka</h3>
              <p className='text-gray-600'>Setiap Hari: 10:00 - 22:00</p>
            </div>
            <div className='text-center'>
              <MapPin className='w-8 h-8 mx-auto mb-4 text-red-600' />
              <h3 className='text-xl font-semibold mb-2'>Lokasi</h3>
              <p className='text-gray-600'>Jl. Seblak No. 123, Jakarta</p>
            </div>
            <div className='text-center'>
              <Phone className='w-8 h-8 mx-auto mb-4 text-red-600' />
              <h3 className='text-xl font-semibold mb-2'>Kontak</h3>
              <p className='text-gray-600'>+62 812-3456-7890</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-4'>
                <ChiliIcon className='h-8 w-8 text-red-600' />
                <span className='font-bold text-2xl'>SeleraSeblak</span>
              </div>
              <p className='text-gray-400'>Sensasi pedas yang menggoda dalam setiap hidangan.</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Jam Buka</h4>
              <p className='text-gray-400'>Setiap Hari</p>
              <p className='text-gray-400'>10:00 - 22:00</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Kontak</h4>
              <p className='text-gray-400'>Jl. Seblak No. 123</p>
              <p className='text-gray-400'>Jakarta, Indonesia</p>
              <p className='text-gray-400'>+62 812-3456-7890</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Ikuti Kami</h4>
              <div className='flex space-x-4'>
                <Instagram className='w-6 h-6' />
                <Facebook className='w-6 h-6' />
              </div>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-gray-800 text-center text-gray-400'>
            <p>&copy; {new Date().getFullYear()} SeleraSeblak. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Menu Item Modal */}
      {isModalOpen && selectedDish && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg max-w-2xl w-full mx-4'>
            <div className='relative'>
              <img src={selectedDish.image} alt={selectedDish.name} className='w-full h-64 object-cover rounded-t-lg' />
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
                  <ChiliIcon key={i} className='w-4 h-4 text-red-600' />
                ))}
              </div>
              <p className='text-gray-600 mb-6'>{selectedDish.description}</p>
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
    </div>
  );
}

export default App;
