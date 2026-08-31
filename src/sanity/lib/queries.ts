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
