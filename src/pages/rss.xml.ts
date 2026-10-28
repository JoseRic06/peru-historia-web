import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articulosHistoria, explicadoresPublicados, noticiasPublicadas, url } from '../lib/utils';

export async function GET(context: APIContext) {
  const historia = (await articulosHistoria()).map((e) => ({
    title: e.data.titulo,
    pubDate: e.data.fecha_publicacion,
    description: e.data.resumen,
    link: url(`historia/${e.id}/`),
    categories: e.data.etiquetas,
  }));
  const explicadores = (await explicadoresPublicados()).map((e) => ({
    title: `Explicador: ${e.data.titulo}`,
    pubDate: e.data.fecha_publicacion,
    description: e.data.resumen,
    link: url(`explicadores/${e.id}/`),
    categories: e.data.etiquetas,
  }));
  const noticias = (await noticiasPublicadas()).map((e) => ({
    title: e.data.titulo,
    pubDate: e.data.fecha,
    description: e.data.resumen,
    link: url(`noticias/${e.id}/`),
    categories: e.data.etiquetas,
  }));

  const items = [...historia, ...explicadores, ...noticias].sort((a, b) => +b.pubDate - +a.pubDate);

  return rss({
    title: 'Perú: historia y contexto',
    description: 'Historia, noticias y explicadores sobre el Perú, con fuentes verificables.',
    site: new URL(url(''), context.site!),
    items,
    customData: '<language>es</language>',
  });
}
