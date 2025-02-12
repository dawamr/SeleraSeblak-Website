import React from 'react';
import { Menu, Flame } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-red-600" />
              <span className="font-bold text-2xl">SeleraSeblak</span>
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-red-600">Home</a>
            <a href="/menu" className="text-gray-700 hover:text-red-600">Menu</a>
            <a href="/#app" className="text-gray-700 hover:text-red-600">App</a>
            <a href="/#partnership" className="text-gray-700 hover:text-red-600">Partnership</a>
            <a href="/checkout" className="text-gray-700 hover:text-red-600">Checkout</a>
          </div>
          <div className="md:hidden">
            <Menu className="h-6 w-6" />
          </div>
        </div>
      </div>
    </nav>
  );
}
