import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'static',
  vite: {
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
      'import.meta.env.VITE_CMS_URL': JSON.stringify(process.env.VITE_CMS_URL),
    },
  },
});
