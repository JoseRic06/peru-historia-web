import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL y BASE_PATH permiten publicar el mismo código en GitHub Pages
// (https://joseric06.github.io/peru-historia-web/) y en Netlify (raíz del dominio).
const site = process.env.SITE_URL || 'https://joseric06.github.io';
const base = process.env.BASE_PATH || "/peru-historia-web";

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
});
