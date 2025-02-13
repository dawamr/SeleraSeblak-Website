import React, { useState, useEffect } from 'react';
import { MapPin, Phone, QrCode, Banknote, CreditCard, Wallet } from 'lucide-react';
import { MenuItem, Topping, SpicyLevel, getMenuItems, getToppings, getSpicyLevels } from '../types/menu';
import { getImageUrl } from '../utils/image';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
}

const storeLocations: StoreLocation[] = [
  { id: '1', name: 'SeleraSeblak Jakarta Pusat', address: 'Jl. Thamrin No. 10, Jakarta Pusat' },
  { id: '2', name: 'SeleraSeblak Jakarta Selatan', address: 'Jl. Sudirman No. 25, Jakarta Selatan' },
  { id: '3', name: 'SeleraSeblak Jakarta Utara', address: 'Jl. Kelapa Gading No. 5, Jakarta Utara' },
];

interface OrderDetails {
  selectedToppings: string[];
  selectedSpicyLevel: string;
  notes: string;
}

interface CartItem {
  menuItem: MenuItem;
  orderDetails: OrderDetails;
  quantity: number;
}

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'mbanking' | 'cash'>('qris');
  const [pickupMethod, setPickupMethod] = useState<'pickup'>('pickup');
  const [pickupLocation, setPickupLocation] = useState<string>(storeLocations[0].id);
  const [promoCode, setPromoCode] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [spicyLevels, setSpicyLevels] = useState<SpicyLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [toppingsData, spicyLevelsData] = await Promise.all([getToppings(), getSpicyLevels()]);

        setToppings(toppingsData);
        setSpicyLevels(spicyLevelsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('seleraSeblakCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotalPrice = (item?: MenuItem, details?: OrderDetails) => {
    if (!item) return 0;
    const toppingsPrice =
      details?.selectedToppings.reduce((total, toppingId) => {
        const topping = toppings.find((t) => t.id === toppingId);
        return total + (topping?.price || 0);
      }, 0) || 0;
    const spicyLevelPrice = spicyLevels.find((l) => l.id === details?.selectedSpicyLevel)?.price || 0;
    return item.basePrice + toppingsPrice + spicyLevelPrice;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    if (!name) errors.name = 'Nama Lengkap wajib diisi.';
    if (!whatsappNumber) errors.whatsappNumber = 'Nomor WhatsApp wajib diisi.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const applyPromoCode = async () => {
    setIsApplyingPromo(true);
    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.promoCode;
      return newErrors;
    });

    // Simulate API call or validation process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isValidPromoCode = promoCode.length === 8 && /^[A-Z0-9]+$/.test(promoCode);

    if (isValidPromoCode) {
      setDiscount(0.1); // 10% discount
      alert('Kode promo berhasil diterapkan!');
    } else {
      setDiscount(0);
      let promoCodeError = 'Kode promo tidak valid.';
      if (promoCode.length !== 8) {
        promoCodeError = 'Kode promo harus 8 karakter.';
      } else if (!/^[A-Z0-9]+$/.test(promoCode)) {
        promoCodeError = 'Kode promo hanya boleh berisi huruf dan angka.';
      }
      setFormErrors((prev) => ({ ...prev, promoCode: promoCodeError }));
    }

    setIsApplyingPromo(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Implement your submit logic here
    alert('Fitur Checkout belum tersedia');
  };

  const subtotal = cart.reduce(
    (total, item) => total + calculateTotalPrice(item.menuItem, item.orderDetails) * item.quantity,
    0,
  );
  const discountAmount = subtotal * discount;
  const totalPrice = subtotal - discountAmount;

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>;
  }

  if (error) {
    return <div className='min-h-screen flex items-center justify-center text-red-600'>{error}</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          {/* Order Summary Card */}
          <div className='h-fit rounded-lg border bg-card text-card-foreground shadow-sm'>
            <div className='flex flex-col space-y-1.5 p-6'>
              <p className='text-lg font-semibold leading-none tracking-tight'>Ringkasan Pesanan</p>
              <p className='text-sm text-muted-foreground'>Detail pesanan Anda</p>
            </div>
            <div className='p-6 pt-0'>
              <div className='space-y-4'>
                {cart.map((item) => (
                  <div key={item.menuItem.id} className='flex items-center space-x-4'>
                    <img
                      src={getImageUrl(item.menuItem.photo)}
                      alt={item.menuItem.name}
                      className='w-12 h-12 object-cover rounded-lg'
                    />
                    <div className='flex-1 space-y-1'>
                      <h3 className='font-medium'>{item.menuItem.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        Topping:{' '}
                        {item.orderDetails.selectedToppings
                          .map((toppingId) => toppings.find((t) => t.id === toppingId)?.name)
                          .join(', ') || 'Tidak ada'}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Level Pedas: {spicyLevels.find((l) => l.id === item.orderDetails.selectedSpicyLevel)?.name}
                      </p>
                      <p className='mt-2 font-medium'>
                        {item.quantity} x {formatPrice(calculateTotalPrice(item.menuItem, item.orderDetails))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-6 border-t pt-4'>
                <div className='flex justify-between'>
                  <span className='font-medium'>Subtotal</span>
                  <span className='font-medium'>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className='flex justify-between'>
                    <span className='font-medium'>Discount</span>
                    <span className='font-medium'>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className='flex justify-between mt-2'>
                  <span className='font-bold'>Total</span>
                  <span className='font-bold'>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information Card */}
          <div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
            <div className='flex flex-col space-y-1.5 p-6'>
              <p className='text-lg font-semibold leading-none tracking-tight'>Informasi Pengiriman</p>
              <p className='text-sm text-muted-foreground'>Masukkan detail pengiriman Anda</p>
            </div>
            <div className='p-6 pt-0'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='name'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type='text'
                    id='name'
                    className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Masukkan nama lengkap'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {formErrors.name && <p className='text-red-500 text-xs italic'>{formErrors.name}</p>}
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='whatsapp'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    type='tel'
                    id='whatsapp'
                    className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Masukkan nomor WhatsApp'
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                  />
                  {formErrors.whatsappNumber && (
                    <p className='text-red-500 text-xs italic'>{formErrors.whatsappNumber}</p>
                  )}
                </div>

                <div className='space-y-3'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Metode Pembayaran
                  </label>
                  <div className='grid gap-3'>
                    <div className='flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent'>
                      <input
                        type='radio'
                        id='qris'
                        name='paymentMethod'
                        value='qris'
                        className='aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                        checked={paymentMethod === 'qris'}
                        onChange={() => setPaymentMethod('qris')}
                      />
                      <label
                        htmlFor='qris'
                        className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        <div className='flex items-center space-x-2'>
                          <Wallet className='h-4 w-4' />
                          <span>QRIS</span>
                        </div>
                      </label>
                    </div>
                    <div className='flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent'>
                      <input
                        type='radio'
                        id='mbanking'
                        name='paymentMethod'
                        value='mbanking'
                        className='aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                        checked={paymentMethod === 'mbanking'}
                        onChange={() => setPaymentMethod('mbanking')}
                      />
                      <label
                        htmlFor='mbanking'
                        className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        <div className='flex items-center space-x-2'>
                          <CreditCard className='h-4 w-4' />
                          <span>m-Banking</span>
                        </div>
                      </label>
                    </div>
                    <div className='flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent'>
                      <input
                        type='radio'
                        id='cash'
                        name='paymentMethod'
                        value='cash'
                        className='aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                      />
                      <label
                        htmlFor='cash'
                        className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        <div className='flex items-center space-x-2'>
                          <MapPin className='h-4 w-4' />
                          <span>Bayar di Tempat</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Metode Pengambilan
                  </label>
                  <div className='grid gap-3'>
                    <div className='flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent [&:has(:checked)]:bg-accent'>
                      <input
                        type='radio'
                        id='pickup'
                        name='pickupMethod'
                        value='pickup'
                        className='aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                        checked={pickupMethod === 'pickup'}
                        onChange={() => setPickupMethod('pickup')}
                        disabled
                      />
                      <label
                        htmlFor='pickup'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        Ambil di Toko (Segera Hadir)
                      </label>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    Lokasi Pengambilan
                  </label>
                  <select
                    className='flex h-9 w-full appearance-none items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=open]]:ring-2 [&[data-state=open]]:ring-ring [&:focus-visible]:outline-none [&:focus-visible]:ring-2 [&:focus-visible]:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                    defaultValue='jakarta'
                  >
                    {storeLocations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='promo'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Kode Promo (Opsional)
                  </label>
                  <div className='flex'>
                    <input
                      type='text'
                      id='promo'
                      className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
                      placeholder='Masukkan kode promo'
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      maxLength={8}
                    />
                    <button
                      type='button'
                      className={`bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors ml-2 ${
                        isApplyingPromo ? 'animate-pulse' : ''
                      }`}
                      onClick={applyPromoCode}
                      disabled={isApplyingPromo}
                    >
                      {isApplyingPromo ? 'Menerapkan...' : 'Gunakan'}
                    </button>
                  </div>
                  {formErrors.promoCode && <p className='text-red-500 text-xs italic'>{formErrors.promoCode}</p>}
                </div>

                <button
                  className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full bg-red-500 hover:bg-red-600 text-white'
                  onClick={handleSubmit}
                >
                  Selesaikan Pesanan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
