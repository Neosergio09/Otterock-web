# 🐾 Otterock — Tecnología con Alma y Compromiso Social

> Agencia de desarrollo web de alto rendimiento con sede en Bogotá. Creamos software artesanal, ultrarrápido y escalable mientras convertimos cada proyecto en donaciones de alimento para perritos rescatados.

---

## ⚡ Stack Tecnológico

La plataforma de **Otterock** está construida con un stack de ingeniería de vanguardia enfocado en rendimiento, cero fricción y SEO técnico nativo:

- **Core Web Framework:** [Astro 7](https://astro.build/) (Páginas estáticas prerenderizadas, Content Collections, cero JavaScript innecesario)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (Motor Vite de alto rendimiento y diseño responsivo)
- **Tipado & Robustez:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en componentes y endpoints)
- **Despliegue & Edge:** [Vercel Edge Network](https://vercel.com/) (CDN global de ultra baja latencia con `@astrojs/vercel`)
- **Email Transaccional:** [Resend](https://resend.com/) (API de entrega de correo de alta confiabilidad en `/api/send`)
- **Base de Datos & Auth:** [Supabase](https://supabase.com/) (PostgreSQL en la nube, Row Level Security)
- **SEO & Datos Estructurados:** Schema.org JSON-LD (`Organization`, `WebSite`, `Article`, `BreadcrumbList`), Open Graph, Twitter Cards y Sitemap dinámico i18n (`es` / `en`).

---

## 📂 Estructura del Proyecto

```text
/
├── public/                  # Robots.txt, imagen Open Graph por defecto
├── src/
│   ├── assets/              # Imágenes fuente (se optimizan en el build), fotos de Rocko y certificados
│   ├── components/          # Componentes Astro (MagicNavbar, SEOSchema, BlogCard...)
│   ├── content/blog/        # Posts del blog en Markdown: es/{slug}.md y en/{slug}.md
│   ├── i18n/                # Configuración y traducciones internacionales (ES / EN)
│   ├── layouts/             # MainLayout (SEO, Open Graph) y PostLayout (artículos del blog)
│   ├── content.config.ts    # Esquema de la colección del blog
│   └── pages/               # Páginas estáticas; solo la API corre en servidor
│       ├── api/send.ts      # Endpoint serverless para envío de formularios vía Resend
│       ├── posts/[slug].astro  # Rutas de los posts generadas desde la colección
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

## ✍️ Publicar un post

1. Crea `src/content/blog/es/{slug}.md` y `src/content/blog/en/{slug}.md` con el mismo `slug`.
2. Copia el frontmatter de un post existente y ajusta los campos (el esquema en `src/content.config.ts` valida que no falte nada).
3. Pon la imagen de portada en `src/assets/` y referénciala con ruta relativa (`../../../assets/mi-imagen.jpg`).

La ruta, la tarjeta del índice del blog, el sitemap y el schema `BlogPosting` se generan solos.

---

## 🐾 El Legado de Rocko

Por cada sitio web que construimos, destinamos un porcentaje de nuestras ganancias para donar bultos de alimento a refugios de animales en Bogotá.
