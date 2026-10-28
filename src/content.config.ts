import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { EPOCA_IDS } from './lib/epocas';

const MSG_FUENTES =
  'FALTAN FUENTES: este contenido debe tener al menos una fuente (titulo, autor y url) en el campo "fuentes". ' +
  'Sin fuentes la web no se construye. Revisa COMO-PUBLICAR.md.';

const fuente = z.object({
  titulo: z.string().min(1, 'La fuente necesita "titulo".'),
  autor: z.string().min(1, 'La fuente necesita "autor".'),
  url: z.string().url('La fuente necesita una "url" válida que empiece con https://'),
  fecha_consulta: z.coerce.date().optional(),
});

const imagen = z.object({
  archivo: z.string().min(1), // ruta en /public (ej. /imagenes/inti.jpg) o URL completa
  alt: z.string().min(1, 'Cada imagen necesita "alt" (descripción para lectores de pantalla).'),
  autor: z.string().min(1, 'Cada imagen necesita "autor".'),
  licencia: z.string().min(1, 'Cada imagen necesita "licencia" (ej. CC BY-SA 4.0, dominio público).'),
  url_origen: z.string().url().optional(),
});

// Un año (1821) o un rango ("1879-1884")
const fechaEvento = z.union([
  z.number().int(),
  z.string().regex(/^\d{3,4}(-\d{3,4})?$/, 'fecha_evento debe ser un año (1821) o un rango ("1879-1884").'),
]);

const articulo = z.object({
  titulo: z.string(),
  fecha_publicacion: z.coerce.date(),
  fecha_actualizacion: z.coerce.date().optional(),
  epoca: z.enum(EPOCA_IDS),
  fecha_evento: fechaEvento,
  serie: z.string().optional(),
  resumen: z.string().max(300, 'El resumen debe tener máximo 300 caracteres.'),
  etiquetas: z.array(z.string()).default([]),
  imagenes: z.array(imagen).default([]),
  video_relacionado: z.string().optional(), // nombre del archivo en src/content/videos (sin .md)
  fuentes: z.array(fuente).default([]).refine((f) => f.length > 0, { message: MSG_FUENTES }),
  borrador: z.boolean().default(false),
});

const historia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/historia' }),
  schema: articulo,
});

const explicadores = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/explicadores' }),
  // Los explicadores no son de una época concreta: epoca y fecha_evento son opcionales.
  schema: articulo.extend({
    epoca: z.enum(EPOCA_IDS).optional(),
    fecha_evento: fechaEvento.optional(),
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    fecha_actualizacion: z.coerce.date().optional(),
    resumen: z.string(),
    etiquetas: z.array(z.string()).default([]),
    // Cada noticia del día lleva su propio enlace a la fuente original.
    noticias: z
      .array(
        z.object({
          titulo: z.string(),
          resumen: z.string(),
          medio: z.string().min(1, 'Cada noticia necesita "medio" (nombre del diario o sitio).'),
          url: z.string().url('Cada noticia necesita "url" válida.'),
        }),
      )
      .default([])
      .refine((n) => n.length > 0, { message: MSG_FUENTES }),
    borrador: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    titulo: z.string(),
    fecha_publicacion: z.coerce.date(),
    plataforma: z.enum(['youtube', 'tiktok']),
    url: z.string().url(),
    resumen: z.string(),
    destacado: z.boolean().default(false),
    etiquetas: z.array(z.string()).default([]),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { historia, explicadores, noticias, videos };
