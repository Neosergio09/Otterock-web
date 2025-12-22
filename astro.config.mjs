// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // ¡ESTA LÍNEA ES LA QUE QUITA EL ERROR 404!
  site: 'https://otterock-web.vercel.app', 
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});