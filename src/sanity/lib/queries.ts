import { defineQuery } from "next-sanity";

/**
 * Proyección resumida y ligera exclusiva para tarjetas y listados (Home y /noticias).
 * No incluye body Portable Text, multimedia ni adjuntos para optimizar peso y rendimiento.
 */
const NOTICIA_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  date,
  category,
  author,
  readTime,
  coverVariant,
  featured,
  mainImage {
    alt,
    "url": asset->url,
    "dimensions": asset->metadata.dimensions {
      width,
      height,
      aspectRatio
    }
  }
`;

/**
 * Proyección completa exclusiva para el artículo individual por slug.
 * Incluye body Portable Text con resolución de imágenes, SEO, videos y PDFs.
 */
const NOTICIA_DETAIL_FIELDS = `
  ${NOTICIA_CARD_FIELDS},
  seoTitle,
  seoDescription,
  body[] {
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  socialMedia[] {
    _key,
    title,
    platform,
    contentType,
    url,
    description,
    thumbnail {
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  attachments[] {
    _key,
    title,
    description,
    "url": file.asset->url,
    "originalFilename": file.asset->originalFilename,
    "size": file.asset->size
  }
`;

/**
 * Listado de todas las noticias publicadas (resumido para tarjetas).
 */
export const noticiasQuery = defineQuery(`
  *[_type == "noticia" && !(_id in path("drafts.**"))] | order(date desc) {
    ${NOTICIA_CARD_FIELDS}
  }
`);

/**
 * Consulta de las N noticias más recientes (resumido con límite GROQ).
 */
export const latestNoticiasQuery = defineQuery(`
  *[_type == "noticia" && !(_id in path("drafts.**"))] | order(date desc)[0...$limit] {
    ${NOTICIA_CARD_FIELDS}
  }
`);

/**
 * Consulta del detalle de una noticia individual por su slug (completa).
 */
export const noticiaBySlugQuery = defineQuery(`
  *[_type == "noticia" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${NOTICIA_DETAIL_FIELDS}
  }
`);

/**
 * Consulta ultraligera de slugs y fechas para sitemap y generateStaticParams.
 */
export const noticiaSlugsQuery = defineQuery(`
  *[_type == "noticia" && !(_id in path("drafts.**"))] | order(date desc) {
    "slug": slug.current,
    date
  }
`);

// ─── Consultas de Eventos (Agenda) ─────────────────────────────────────────────

/**
 * Proyección estándar de campos de evento con resolución de imagen.
 */
const EVENTO_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  startDateTime,
  endDateTime,
  city,
  venue,
  description,
  registrationLink,
  featured,
  status,
  mainImage {
    alt,
    "url": asset->url,
    "dimensions": asset->metadata.dimensions {
      width,
      height,
      aspectRatio
    }
  }
`;

/**
 * Consulta de eventos para la portada (Home):
 * Máximo N próximos eventos vigentes con estado 'programada', ordenados por startDateTime asc.
 * Se considera vigente si coalesce(endDateTime, startDateTime) >= $now (incluye en curso).
 */
export const latestEventosQuery = defineQuery(`
  *[_type == "evento" && !(_id in path("drafts.**")) && status == "programada" && coalesce(endDateTime, startDateTime) >= $now] | order(startDateTime asc)[0...$limit] {
    ${EVENTO_FIELDS}
  }
`);

/**
 * Consulta de eventos para la página de Agenda (/agenda):
 * Todos los eventos vigentes (programados y cancelados para mostrar advertencia), ordenados por startDateTime asc.
 */
export const eventosAgendaQuery = defineQuery(`
  *[_type == "evento" && !(_id in path("drafts.**")) && coalesce(endDateTime, startDateTime) >= $now] | order(startDateTime asc) {
    ${EVENTO_FIELDS}
  }
`);

/**
 * Consulta individual de evento por slug (/agenda/[slug]).
 * Accesible mientras el documento esté publicado, incluso si ya concluyó o fue cancelado.
 */
export const eventoBySlugQuery = defineQuery(`
  *[_type == "evento" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${EVENTO_FIELDS}
  }
`);

/**
 * Consulta ultraligera de slugs y fecha de actualización para generateStaticParams y sitemap.
 */
export const eventoSlugsQuery = defineQuery(`
  *[_type == "evento" && !(_id in path("drafts.**"))] | order(startDateTime asc) {
    "slug": slug.current,
    _updatedAt
  }
`);
