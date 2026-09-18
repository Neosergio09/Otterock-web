# 🐾 Otterock — Tecnología con Alma y Compromiso Social

> Agencia de desarrollo web de alto rendimiento con sede en Bogotá. Creamos software artesanal, ultrarrápido y escalable mientras convertimos cada proyecto en donaciones de alimento para perritos rescatados.

---

## ⚡ Stack Tecnológico

La plataforma de **Otterock** está construida con un stack de ingeniería de vanguardia enfocado en rendimiento, cero fricción y SEO técnico nativo:

- **Core Web Framework:** [Astro 7](https://astro.build/) (Modo híbrido / SSR, Islands Architecture, cero JavaScript innecesario)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Motor Vite de alto rendimiento y diseño responsivo)
- **Tipado & Robustez:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en componentes y endpoints)
- **Efectos Visuales & Shaders:** [WebGL / GLSL](https://www.khronos.org/webgl/) (Animación de quemado de papel cinematográfica con ruido fractal Simplex/fBm)
- **Despliegue & Edge:** [Vercel Edge Network](https://vercel.com/) (CDN global de ultra baja latencia con `@astrojs/vercel`)
- **Email Transaccional:** [Resend](https://resend.com/) (API de entrega de correo de alta confiabilidad en `/api/send`)
- **Base de Datos & Auth:** [Supabase](https://supabase.com/) (PostgreSQL en la nube, Row Level Security)
- **SEO & Datos Estructurados:** Schema.org JSON-LD (`Organization`, `WebSite`, `Article`, `BreadcrumbList`), Open Graph, Twitter Cards y Sitemap dinámico i18n (`es` / `en`).

---

## 📂 Estructura del Proyecto

```text
/
├── public/                  # Favicons, robots.txt, banners Open Graph
├── src/
│   ├── assets/              # Imágenes optimizadas, fotografías de Rocko y certificados
│   ├── components/          # Componentes Astro (IntroScreen con shader WebGL, MagicNavbar, SEOSchema...)
│   ├── i18n/                # Configuración y traducciones internacionales (ES / EN)
│   ├── layouts/             # MainLayout con metaetiquetas SEO completas y Twitter Cards
│   └── pages/               # Rutas estáticas y serverless (Home, Servicios, Blog, Legado, Contacto y API)
│       ├── api/send.ts      # Endpoint serverless para envío de formularios vía Resend
│       └── en/              # Rutas en inglés completamente espejadas
├── astro.config.mjs         # Configuración de Astro, Vercel adapter, Sitemap i18n y Tailwind Vite
├── package.json             # Dependencias del proyecto
└── tsconfig.json            # Configuración de TypeScript
```

---

## 🛠️ Comandos de Desarrollo

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala todas las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321` |
| `npm run astro check` | Valida tipos TypeScript y diagnósticos de componentes Astro |
| `npm run build` | Compila el sitio para producción en `./dist/` |
| `npm run preview` | Previsualiza la compilación de producción localmente |

---

## 🐾 El Legado de Rocko

Por cada sitio web que construimos, destinamos un porcentaje de nuestras ganancias para donar bultos de alimento a refugios de animales en Bogotá.
