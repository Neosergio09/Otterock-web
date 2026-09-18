// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel'; // <--- CAMBIO: Importación limpia sin /serverless

// https://astro.build/config
export default defineConfig({
  site: 'https://otterock.tech',

  // ACTIVAR EL MODO SERVIDOR
  output: 'server',

  trailingSlash: 'never',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
      changefreq: 'weekly',
      lastmod: new Date(),
    })
  ],

  // CONFIGURAR EL ADAPTADOR
  adapter: vercel({
    imageService: true,
  })
});