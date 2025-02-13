import React from 'react';
import { Store } from '../types/store';

interface StoreSelectorProps {
  stores: Store[];
  selectedStore: string;
  onStoreChange: (storeId: string) => void;
}

export default function StoreSelector({ stores, selectedStore, onStoreChange }: StoreSelectorProps) {
  return (
    <div className='mb-4'>
      <select
        value={selectedStore}
        onChange={(e) => onStoreChange(e.target.value)}
        className='w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
      >
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.store_name}
          </option>
        ))}
      </select>
    </div>
  );
}
