// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless'; // Cambiamos a serverless para mejor compatibilidad

// https://astro.build/config
export default defineConfig({
  site: 'https://otterock-web.vercel.app',
  
  // 1. ACTIVAR EL MODO SERVIDOR (Indispensable para la API)
  output: 'server', 

  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],
  
  // 2. CONFIGURAR EL ADAPTADOR
  adapter: vercel({
    webAnalytics: { enabled: true }, // Opcional: activa analíticas de Vercel
  })
});