import React, { useState } from 'react';
import { Menu, Flame, X } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className='fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-2'>
            <a href='/' className='flex items-center space-x-2'>
              <Flame className='h-8 w-8 text-red-600' />
              <span className='font-bold text-2xl'>SeleraSeblak</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-8'>
            <a href='/' className='text-gray-700 hover:text-red-600'>
              Home
            </a>
            <a href='/menu' className='text-gray-700 hover:text-red-600'>
              Menu
            </a>
            <a href='/#app' className='text-gray-700 hover:text-red-600'>
              App
            </a>
            <a href='/#partnership' className='text-gray-700 hover:text-red-600'>
              Partnership
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button onClick={toggleMobileMenu} className='p-2'>
              {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            <a
              href='/'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50'
            >
              Home
            </a>
            <a
              href='/menu'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50'
            >
              Menu
            </a>
            <a
              href='/#app'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50'
            >
              App
            </a>
            <a
              href='/#partnership'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50'
            >
              Partnership
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
