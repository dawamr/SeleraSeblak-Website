import React, { useState, useMemo, useEffect } from 'react';
import { Flame, Grid, List, Search, ShoppingCart, X, MapPin } from 'lucide-react';
import { MenuItem, Topping, SpicyLevel, getMenuItems, getToppings, getSpicyLevels } from '../types/menu';
import StoreSelector from './StoreSelector';
import { Store } from '../types/store';
import { menuService } from '../services/api';
import { getImageUrl } from '../utils/image';
import StoreModal from './StoreModal';
import { sanitizeHtml } from '../utils/sanitize';
import ReadMore from './ReadMore';

interface OrderDetails {
  selectedToppings: number[];
  selectedSpicyLevel: string;
  notes: string;
}

interface CartItem {
  menuItem: MenuItem;
  orderDetails: OrderDetails;
  quantity: number;
}

export default function MenuPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    selectedToppings: [],
    selectedSpicyLevel: '1',
    notes: '',
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [spicyLevels, setSpicyLevels] = useState<SpicyLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [loadingStores, setLoadingStores] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoadingStores(true);
        const storesData = await menuService.getStores();
        setStores(storesData);

        // Cek store dari session storage terlebih dahulu
        const savedStore = sessionStorage.getItem('selectedStore');
        if (savedStore && storesData.some((store) => store.id === savedStore)) {
          setSelectedStore(savedStore);
        } else if (storesData.length > 0) {
          // Jika tidak ada di session atau store tidak valid, gunakan store pertama
          setSelectedStore(storesData[0].id);
          sessionStorage.setItem('selectedStore', storesData[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stores');
      } finally {
        setLoadingStores(false);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedStore) return;

      try {
        setLoadingMenu(true);
        setError(null);

        // Tambahkan delay kecil untuk memastikan state terupdate
        await new Promise((resolve) => setTimeout(resolve, 100));

        const [menuData, toppingsData, spicyLevelsData] = await Promise.all([
          menuService.getMenuItemsByStore(selectedStore),
          getToppings(),
          getSpicyLevels(),
        ]);

        if (Array.isArray(menuData)) {
          setMenuItems(menuData);
        } else {
          console.error('Invalid menu data format:', menuData);
          setMenuItems([]);
        }

        setToppings(toppingsData || []);
        setSpicyLevels(spicyLevelsData || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setMenuItems([]);
        setToppings([]);
        setSpicyLevels([]);
      } finally {
        setLoadingMenu(false);
      }
    };

    if (selectedStore) {
      fetchData();
    }
  }, [selectedStore]);

  useEffect(() => {
    const storedCart = localStorage.getItem('seleraSeblakCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('seleraSeblakCart', JSON.stringify(cart));
  }, [cart]);

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, menuItems]);

  const calculateTotalPrice = (item?: MenuItem, details?: OrderDetails) => {
    if (!item) return 0;
    const usedDetails = details || orderDetails;
    const toppingsPrice = usedDetails.selectedToppings.reduce((total, toppingId) => {
      const topping = toppings.find((t) => t.id === toppingId);
      return total + (topping?.price || 0);
    }, 0);
    const spicyLevelPrice = spicyLevels.find((l) => l.id === usedDetails.selectedSpicyLevel)?.price || 0;
    return item.basePrice + toppingsPrice + spicyLevelPrice;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = () => {
    if (!selectedDish) return;
    const existingCartItem = cart.find(
      (item) =>
        item.menuItem.id === selectedDish.id && JSON.stringify(item.orderDetails) === JSON.stringify(orderDetails),
    );

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.menuItem.id === selectedDish.id && JSON.stringify(item.orderDetails) === JSON.stringify(orderDetails)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCart(updatedCart);
    } else {
      const newCartItem: CartItem = {
        menuItem: selectedDish,
        orderDetails: orderDetails,
        quantity: 1,
      };
      setCart([...cart, newCartItem]);
    }

    setIsModalOpen(false);
    setOrderDetails({
      selectedToppings: [],
      selectedSpicyLevel: '1',
      notes: '',
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.menuItem.id === itemId ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } : item,
    );
    setCart(updatedCart);
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.menuItem.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleStoreChange = async (storeId: string) => {
    try {
      // Set loading dan reset states
      setLoadingMenu(true);
      setError(null);
      setMenuItems([]);

      // Update store selection
      setSelectedStore(storeId);
      sessionStorage.setItem('selectedStore', storeId);

      // Fetch data langsung
      const [menuData, toppingsData, spicyLevelsData] = await Promise.all([
        menuService.getMenuItemsByStore(storeId), // Gunakan storeId baru langsung
        getToppings(),
        getSpicyLevels(),
      ]);

      if (Array.isArray(menuData)) {
        setMenuItems(menuData);
      } else {
        console.error('Invalid menu data format:', menuData);
        setMenuItems([]);
      }

      setToppings(toppingsData || []);
      setSpicyLevels(spicyLevelsData || []);

      // Tutup modal setelah data berhasil diambil
      setIsStoreModalOpen(false);
    } catch (error) {
      console.error('Error changing store:', error);
      setError('Failed to change store');
    } finally {
      setLoadingMenu(false);
    }
  };

  if (loadingStores) {
    return <div className='min-h-screen flex items-center justify-center'>Loading Stores...</div>;
  }

  if (error) {
    return <div className='min-h-screen flex items-center justify-center text-red-600'>{error}</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 pt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Search and Filters */}
        <div className='mb-8 space-y-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Cari menu...'
                className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className='w-5 h-5' />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
              >
                <List className='w-5 h-5' />
              </button>
              <button
                onClick={() => setIsStoreModalOpen(true)}
                className='p-2 rounded-lg bg-white text-gray-600 hover:bg-red-600 hover:text-white transition-colors'
              >
                <MapPin className='w-5 h-5' />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className='p-2 rounded-lg bg-white text-gray-600 hover:bg-red-600 hover:text-white transition-colors relative'
              >
                <ShoppingCart className='w-5 h-5' />
                {cartCount > 0 && (
                  <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-xs px-2 py-0.5 rounded-full'>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className='flex gap-2 overflow-x-auto pb-2'>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedCategory('seblak')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'seblak' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Seblak
            </button>
            <button
              onClick={() => setSelectedCategory('mie')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'mie' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Mie
            </button>
            <button
              onClick={() => setSelectedCategory('burger')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'burger' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              Burger
            </button>
          </div>
        </div>

        {/* Menu Items */}
        {viewMode === 'grid' ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {loadingMenu ? (
              <div className='col-span-3 text-center py-8'>
                <p>Loading menu items...</p>
              </div>
            ) : filteredMenu.length === 0 ? (
              <div className='col-span-3 text-center py-8'>
                <p>Tidak ada menu yang tersedia</p>
              </div>
            ) : (
              filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className='bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform'
                  onClick={() => {
                    setSelectedDish(item);
                    setIsModalOpen(true);
                  }}
                >
                  <img src={getImageUrl(item.photo)} alt={item.name} className='w-full h-48 object-cover' />
                  <div className='p-6'>
                    <h3 className='text-xl font-semibold mb-2'>{item.name}</h3>
                    <p className='text-gray-600 mb-2'>{formatPrice(item.basePrice)}</p>
                    <div
                      className='text-gray-500 text-sm line-clamp-5 mb-4'
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
                    />
                    <div className='flex'>
                      {[...Array(item.spicyLevel)].map((_, i) => (
                        <Flame key={i} className='w-4 h-4 text-red-600' />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className='space-y-4'>
            {loadingMenu ? (
              <div className='text-center py-8'>
                <p>Loading menu...</p>
              </div>
            ) : filteredMenu.length === 0 ? (
              <div className='text-center py-8'>
                <p>Tidak ada menu yang tersedia</p>
              </div>
            ) : (
              filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className='bg-white rounded-lg p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow'
                  onClick={() => {
                    setSelectedDish(item);
                    setIsModalOpen(true);
                  }}
                >
                  <div className='flex gap-4'>
                    <img src={getImageUrl(item.photo)} alt={item.name} className='w-24 h-24 object-cover rounded-lg' />
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold mb-1'>{item.name}</h3>
                      <p className='text-gray-600 mb-1'>{formatPrice(item.basePrice)}</p>
                      <div
                        className='text-gray-500 text-sm line-clamp-5'
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
                      />
                      <div className='flex mt-2'>
                        {[...Array(item.spicyLevel)].map((_, i) => (
                          <Flame key={i} className='w-4 h-4 text-red-600' />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Order Modal */}
      {isModalOpen && selectedDish && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto'>
            <div className='relative'>
              <img
                src={getImageUrl(selectedDish.photo)}
                alt={selectedDish.name}
                className='w-full h-48 object-cover rounded-t-lg'
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className='absolute top-4 right-4 bg-white rounded-full p-1'
              >
                <X className='w-6 h-6' />
              </button>
            </div>
            <div className='p-6'>
              <h3 className='text-2xl font-bold mb-2'>{selectedDish.name}</h3>
              <p className='text-xl text-red-600 mb-4'>{formatPrice(selectedDish.basePrice)}</p>
              <ReadMore text={sanitizeHtml(selectedDish.description)} className='text-gray-600 mb-6' maxLength={150} />

              {/* Topping Selection */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-2'>Pilih Topping</h4>
                <div className='space-y-2 max-h-40 overflow-y-auto'>
                  {selectedDish?.toppings?.map((topping) => (
                    <label key={topping.id} className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={orderDetails.selectedToppings.includes(topping.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOrderDetails({
                              ...orderDetails,
                              selectedToppings: [...orderDetails.selectedToppings, topping.id],
                            });
                          } else {
                            setOrderDetails({
                              ...orderDetails,
                              selectedToppings: orderDetails.selectedToppings.filter((id) => id !== topping.id),
                            });
                          }
                        }}
                        className='rounded border-gray-300 text-red-600 focus:ring-red-500'
                      />
                      <span className='ml-2'>
                        {topping.name} (+{formatPrice(topping.price)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Spicy Level Selection */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-2'>Level Pedas</h4>
                <div className='space-y-2'>
                  {spicyLevels.map((level) => (
                    <label key={level.id} className='flex items-center'>
                      <input
                        type='radio'
                        name='spicyLevel'
                        value={level.id}
                        checked={orderDetails.selectedSpicyLevel === level.id}
                        onChange={(e) => {
                          setOrderDetails({
                            ...orderDetails,
                            selectedSpicyLevel: e.target.value,
                          });
                        }}
                        className='border-gray-300 text-red-600 focus:ring-red-500'
                      />
                      <span className='ml-2 flex items-center gap-2'>
                        {level.name} (+{formatPrice(level.price)})
                        <span className='flex'>
                          {[...Array(level.level)].map((_, i) => (
                            <Flame key={i} className='w-4 h-4 text-red-600' />
                          ))}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className='mb-6'>
                <h4 className='font-semibold mb-2'>Catatan</h4>
                <textarea
                  value={orderDetails.notes}
                  onChange={(e) => setOrderDetails({ ...orderDetails, notes: e.target.value })}
                  placeholder='Tambahkan catatan khusus...'
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
                  rows={3}
                />
              </div>

              {/* Total Price */}
              <div className='text-xl font-bold mb-6'>Total: {formatPrice(calculateTotalPrice(selectedDish))}</div>

              <button
                onClick={addToCart}
                className='w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors'
              >
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
            <div className='p-6 relative'>
              <h2 className='text-2xl font-bold mb-4'>Keranjang Belanja</h2>
              <button onClick={() => setIsCartOpen(false)} className='absolute top-4 right-4 bg-white rounded-full p-1'>
                <X className='w-6 h-6' />
              </button>

              {cart.length === 0 ? (
                <p className='text-gray-600'>Keranjang Anda kosong.</p>
              ) : (
                <div className='space-y-4'>
                  {cart.map((cartItem) => (
                    <div key={cartItem.menuItem.id} className='flex items-start justify-between border-b pb-4'>
                      <div className='flex items-start'>
                        <img
                          src={getImageUrl(cartItem.menuItem.photo)}
                          alt={cartItem.menuItem.name}
                          className='w-24 h-24 object-cover rounded-lg mr-4'
                        />
                        <div>
                          <h3 className='text-lg font-semibold'>{cartItem.menuItem.name}</h3>

                          {/* Display Selected Toppings */}
                          {cartItem.orderDetails.selectedToppings.length > 0 && (
                            <p className='text-gray-500 text-sm'>
                              Topping:{' '}
                              {cartItem.orderDetails.selectedToppings
                                .map((toppingId) => toppings.find((t) => t.id === toppingId)?.name)
                                .join(', ')}
                            </p>
                          )}

                          {/* Display Spicy Level */}
                          <p className='text-gray-500 text-sm'>
                            Level Pedas:{' '}
                            {spicyLevels.find((l) => l.id === cartItem.orderDetails.selectedSpicyLevel)?.name}
                          </p>

                          {/* Display Notes */}
                          {cartItem.orderDetails.notes && (
                            <p className='text-gray-500 text-sm'>Catatan: {cartItem.orderDetails.notes}</p>
                          )}

                          <p className='text-gray-600 text-sm'>
                            {formatPrice(calculateTotalPrice(cartItem.menuItem, cartItem.orderDetails))} x{' '}
                            {cartItem.quantity}
                          </p>
                          <div className='flex items-center mt-2'>
                            <button
                              onClick={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity - 1)}
                              className='px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors'
                            >
                              -
                            </button>
                            <span className='mx-2'>{cartItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity + 1)}
                              className='px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors'
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(cartItem.menuItem.id)}
                        className='text-red-600 hover:text-red-700 transition-colors'
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  <div className='mt-4'>
                    <div className='text-xl font-bold mb-2'>
                      Total:{' '}
                      {formatPrice(
                        cart.reduce(
                          (total, item) =>
                            total + calculateTotalPrice(item.menuItem, item.orderDetails) * item.quantity,
                          0,
                        ),
                      )}
                    </div>
                    <button
                      onClick={clearCart}
                      className='bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors mr-2'
                    >
                      Kosongkan Keranjang
                    </button>
                    <button
                      onClick={() => {
                        // Navigate to checkout page with cart data
                        window.location.href = '/checkout';
                        setIsCartOpen(false);
                      }}
                      className='bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors'
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Store Modal */}
      <StoreModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        stores={stores}
        selectedStore={selectedStore}
        onStoreChange={handleStoreChange}
      />
    </div>
  );
}
