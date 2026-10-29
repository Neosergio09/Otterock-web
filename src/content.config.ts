import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Posts en src/content/blog/{es,en}/{slug}.md — el mismo slug en ambos idiomas
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.string(),
      section: z.string(),
      readingTime: z.number().int().positive(),
      quote: z.string().optional(),
      // Imagen local (optimizada) o URL externa
      image: z.union([image(), z.url()]),
      imageAlt: z.string(),
      tags: z.array(z.string()),
      author: z.string().default('Sergio Bello'),
      card: z.object({
        emoji: z.string(),
        badgeClass: z.string(),
        title: z.string(),
        excerpt: z.string(),
        category: z.string().optional(),
      }),
    }),
});

const projectText = z.object({
  type: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
});

// Portafolio: un JSON por proyecto con los textos en ambos idiomas
const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      url: z.url().optional(),
      status: z.enum(['production', 'demo']),
      order: z.number(),
      image: image().optional(),
      emoji: z.string(),
      stack: z.array(z.string()),
      es: projectText,
      en: projectText,
    }),
});

export const collections = { blog, projects };
