// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://otterock-web.vercel.app',

  // AGREGA ESTA LÍNEA:
  // Fuerza a que las URLs no tengan barra al final (ej: /about)
  // Esto evita errores de redirección en Google Search Console.
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],
  adapter: vercel()
});