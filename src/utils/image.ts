const CMS_URL = import.meta.env.VITE_CMS_URL || 'https://cms.seleraseblak.com';

// Tambahkan logging untuk debug
console.log('CMS URL:', CMS_URL);

export const getImageUrl = (photoId?: string, width: number = 400) => {
  if (!photoId) return '/default-menu.jpg';

  // Validasi photoId dan CMS_URL
  if (!CMS_URL) {
    console.error('CMS_URL is not defined');
    return '/default-menu.jpg';
  }

  try {
    return `${CMS_URL}/assets/${photoId}?width=${width}`;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '/default-menu.jpg';
  }
};
