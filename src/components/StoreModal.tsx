import React from 'react';
import { X, MapPin } from 'lucide-react';
import { Store } from '../types/store';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores: Store[];
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

export default function StoreModal({ isOpen, onClose, stores, selectedStore, onStoreChange }: StoreModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg max-w-md w-full mx-4'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold'>Pilih Store</h2>
            <button onClick={onClose} className='p-1 hover:bg-gray-100 rounded-full'>
              <X className='w-6 h-6' />
            </button>
          </div>
          <div className='space-y-4 max-h-[60vh] overflow-y-auto'>
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => {
                  onStoreChange(store.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-lg border text-left hover:border-red-500 transition-colors ${
                  selectedStore === store.id ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className='flex items-start gap-3'>
                  <MapPin className='w-5 h-5 text-red-500 mt-1' />
                  <div>
                    <h3 className='font-semibold'>{store.store_name}</h3>
                    <p className='text-sm text-gray-600'>{store.store_address}</p>
                    <p className='text-sm text-gray-600'>{store.store_phone}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
