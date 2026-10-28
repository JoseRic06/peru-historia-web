---
# PLANTILLA DE ARTÍCULO DE HISTORIA
# Copia este archivo a src/content/historia/ con un nombre en minúsculas y con guiones:
#   src/content/historia/guerra-del-pacifico-batalla-de-angamos.md
# El nombre del archivo será la dirección web del artículo.

titulo: "Título del artículo"
fecha_publicacion: 2026-01-31          # AAAA-MM-DD
fecha_actualizacion: 2026-01-31        # opcional; si lo omites se usa la de publicación
# epoca: preinca | inca | conquista | virreinato | independencia | republica | contemporanea
epoca: republica
fecha_evento: 1879                     # un año (1879) o un rango entre comillas ("1879-1884")
serie: "Guerra del Pacífico"           # opcional; artículos con la misma serie se agrupan
resumen: "Una o dos frases (máximo 300 caracteres)."
etiquetas: ["etiqueta uno", "etiqueta dos"]
imagenes:                              # opcional; si pones una imagen, autor y licencia son obligatorios
  - archivo: "/imagenes/nombre-de-la-imagen.jpg"   # archivo dentro de public/imagenes/ o una URL https://
    alt: "Describe lo que se ve en la imagen"
    autor: "Nombre del autor"
    licencia: "CC BY-SA 4.0"
    url_origen: "https://commons.wikimedia.org/..."   # opcional
video_relacionado: "nombre-del-archivo-de-video"      # opcional; nombre del .md en src/content/videos (sin .md)
fuentes:                               # OBLIGATORIO: al menos una. Sin fuentes la web no se construye.
  - titulo: "Título del libro, artículo o documento"
    autor: "Apellido, Nombre"
    url: "https://enlace-a-la-fuente.org/"
# borrador: true                       # quita el # para que NO se publique todavía
---

Escribe aquí el texto en Markdown.

## Un subtítulo

Párrafos normales, **negrita**, *cursiva*, listas:

- punto uno
- punto dos

> Una cita destacada.
