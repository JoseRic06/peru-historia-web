# Cómo publicar contenido

Todo el contenido son archivos de texto (Markdown) dentro de `src/content/`. No hay que tocar código.

## Regla de oro

**Todo contenido necesita fuentes.** Si falta la lista `fuentes` (o una noticia no tiene `url`),
la web **no se construye** y GitHub no publica nada. El error te dice qué archivo revisar.

## Pasos para agregar un artículo de historia

1. Copia `plantillas/articulo-historia.md` a `src/content/historia/` con un nombre en minúsculas y con guiones,
   por ejemplo `batalla-de-angamos-1879.md`. El nombre será la dirección web.
2. Rellena los datos de arriba (entre las rayas `---`) y escribe el texto debajo.
3. Pruébalo en tu computadora (ver más abajo).
4. Publica (ver "Publicar").

### Datos importantes del encabezado

| Campo | Qué poner |
|---|---|
| `epoca` | `preinca`, `inca`, `conquista`, `virreinato`, `independencia`, `republica` o `contemporanea` |
| `fecha_evento` | Un año (`1821`) o un rango entre comillas (`"1879-1884"`). Con esto se arma la línea de tiempo |
| `serie` | Nombre de la serie (ej. `"Independencia"`). Mismo nombre = se agrupan juntos |
| `resumen` | Máximo 300 caracteres |
| `fuentes` | Obligatoria: `titulo`, `autor` y `url` de cada fuente |
| `imagenes` | Opcional, pero cada imagen exige `alt`, `autor` y `licencia` |
| `video_relacionado` | Opcional: nombre del archivo del video en `src/content/videos/` (sin `.md`) |
| `borrador: true` | Opcional: el contenido se guarda pero no se publica |

La **fecha de última actualización** sale de `fecha_actualizacion` (si no la pones, se usa `fecha_publicacion`).
Cuando corrijas un artículo, actualiza esa fecha.

## Otros tipos de contenido

- **Explicador** (texto de un video corto): copia la plantilla de historia a `src/content/explicadores/`.
  `epoca` y `fecha_evento` son opcionales.
- **Noticias del día**: copia `plantillas/noticias-del-dia.md` a `src/content/noticias/` y nómbralo con la fecha
  (`2026-01-31.md`). Cada noticia lleva su resumen propio y el enlace a la fuente.
- **Video**: copia `plantillas/video.md` a `src/content/videos/`. Usa `destacado: true` para mostrarlo en Inicio.

## Imágenes

Guarda el archivo en `public/imagenes/` y escribe `archivo: "/imagenes/mi-imagen.jpg"`.
Usa solo imágenes propias, de dominio público o con licencia libre (por ejemplo, Wikimedia Commons) y anota autor y licencia.

## Probar en tu computadora

```bash
npm install
npm run dev
```

Abre la dirección que aparece (normalmente http://localhost:4321/peru-historia-web/). El buscador solo funciona
después de compilar:

```bash
npm run build
npm run preview
```

## Publicar

Cada vez que hagas `push` a la rama `main`, GitHub Actions compila y publica en GitHub Pages
(`https://joseric06.github.io/peru-historia-web/`).

```bash
git add .
git commit -m "Agrego artículo sobre ..."
git push
```

Puedes ver el avance en la pestaña **Actions** del repositorio. Si sale una ❌, abre el detalle: casi siempre
es una fuente que falta o un dato mal escrito.

### Configuración única en GitHub

En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Espejo en Netlify

1. En Netlify: **Add new site → Import an existing project** y elige este repositorio.
2. No cambies nada: `netlify.toml` ya tiene la configuración.
3. En **Site settings → Environment variables** agrega `SITE_URL` con la dirección de tu sitio de Netlify
   (por ejemplo `https://mi-sitio.netlify.app`) para que el RSS y el mapa del sitio usen esa dirección.

## Errores comunes

- **"FALTAN FUENTES"**: agrega al menos una fuente con `titulo`, `autor` y `url` (empieza con `https://`).
- **"fecha_evento debe ser un año…"**: escribe `1821` o `"1879-1884"` (con comillas si es rango).
- **`epoca` inválida**: usa exactamente uno de los valores de la tabla.
- **Las fechas con espacios o tabulaciones**: en el encabezado se usan espacios, no tabulaciones.
