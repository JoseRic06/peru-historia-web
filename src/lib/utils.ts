import { getCollection, type CollectionEntry } from 'astro:content';
import { ordenEpoca } from './epocas';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Construye una ruta interna respetando la base (GitHub Pages usa /peru-historia-web). */
export const url = (ruta = '') => `${BASE}/${ruta.replace(/^\//, '')}`;

/** Para imágenes: rutas internas llevan la base, URLs completas se dejan igual. */
export const rutaImagen = (archivo: string) => (/^https?:\/\//.test(archivo) ? archivo : url(archivo));

export const formatoFecha = (d: Date) =>
  d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const fechaISO = (d: Date) => d.toISOString().slice(0, 10);

/** "1879-1884" -> [1879, 1884]; 1821 -> [1821, 1821] */
export function rangoEvento(f: string | number | undefined): [number, number] | null {
  if (f === undefined) return null;
  const [a, b] = String(f).split('-').map(Number);
  return [a, b ?? a];
}

export const textoEvento = (f: string | number | undefined) =>
  f === undefined ? '' : String(f).replace('-', '–');

/** Enlace a la copia en archive.org (la Wayback Machine redirige a la copia más reciente). */
export const archiveUrl = (paginaUrl: string) => `https://web.archive.org/web/${paginaUrl}`;

export const urlAbsoluta = (ruta: string, site?: URL) => new URL(url(ruta), site).href;

export function idYoutube(u: string): string | null {
  const m = u.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function idTiktok(u: string): string | null {
  const m = u.match(/\/video\/(\d+)/);
  return m ? m[1] : null;
}

const noBorrador = ({ data }: { data: { borrador: boolean } }) => !data.borrador;

export async function articulosHistoria() {
  const todos = (await getCollection('historia')).filter(noBorrador);
  return todos.sort((a, b) => {
    const e = ordenEpoca(a.data.epoca) - ordenEpoca(b.data.epoca);
    if (e !== 0) return e;
    return (rangoEvento(a.data.fecha_evento)![0]) - (rangoEvento(b.data.fecha_evento)![0]);
  });
}

export async function ultimosHistoria(n = 3) {
  return (await getCollection('historia'))
    .filter(noBorrador)
    .sort((a, b) => +b.data.fecha_publicacion - +a.data.fecha_publicacion)
    .slice(0, n);
}

export async function explicadoresPublicados() {
  return (await getCollection('explicadores'))
    .filter(noBorrador)
    .sort((a, b) => +b.data.fecha_publicacion - +a.data.fecha_publicacion);
}

export async function noticiasPublicadas() {
  return (await getCollection('noticias')).filter(noBorrador).sort((a, b) => +b.data.fecha - +a.data.fecha);
}

export async function videosPublicados() {
  return (await getCollection('videos'))
    .filter(noBorrador)
    .sort((a, b) => +b.data.fecha_publicacion - +a.data.fecha_publicacion);
}

export type Historia = CollectionEntry<'historia'>;
