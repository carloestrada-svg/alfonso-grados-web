import "server-only";

import { client } from "./client";
import {
  noticiasQuery,
  latestNoticiasQuery,
  noticiaBySlugQuery,
  noticiaSlugsQuery,
} from "./queries";
import {
  newsArticles as staticNewsArticles,
  getArticleBySlug as getStaticArticleBySlug,
  type NewsArticle,
} from "@/lib/data/news";

type SanityRawNoticia = {
  _id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  category?: string;
  author?: string;
  readTime?: string;
  coverVariant?: number;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  mainImage?: NewsArticle["mainImage"];
  body?: NewsArticle["body"];
  socialMedia?: NewsArticle["socialMedia"];
  attachments?: NewsArticle["attachments"];
};

/**
 * Valida si un string representa una fecha ISO válida.
 */
function isValidISODate(dateStr: unknown): boolean {
  if (typeof dateStr !== "string" || !dateStr.trim()) {
    return false;
  }
  const timestamp = Date.parse(dateStr);
  return !Number.isNaN(timestamp);
}

/**
 * Normaliza una fecha ISO válida a formato `YYYY-MM-DD`.
 */
function normalizeISODate(dateStr: string): string {
  const [datePart] = dateStr.split("T");
  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return datePart;
  }
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
}

/**
 * Valida exhaustivamente que un documento crudo recibido desde Sanity
 * cuente con todos los campos editoriales requeridos antes de normalizar.
 * Si algún campo obligatorio falta o está vacío, se rechaza.
 */
function isValidSanityRawDoc(raw: unknown): raw is SanityRawNoticia {
  if (!raw || typeof raw !== "object") {
    return false;
  }
  const doc = raw as Record<string, unknown>;

  if (typeof doc.slug !== "string" || !doc.slug.trim()) return false;
  if (typeof doc.title !== "string" || !doc.title.trim()) return false;
  if (typeof doc.excerpt !== "string" || !doc.excerpt.trim()) return false;
  if (!isValidISODate(doc.date)) return false;
  if (typeof doc.category !== "string" || !doc.category.trim()) return false;
  if (typeof doc.author !== "string" || !doc.author.trim()) return false;
  if (typeof doc.readTime !== "string" || !doc.readTime.trim()) return false;

  return true;
}

/**
 * Normaliza un documento validado de Sanity hacia el tipo NewsArticle.
 * - Fecha normalizada a `YYYY-MM-DD`.
 * - coverVariant validado (1, 2 o 3; 1 por defecto).
 * - Asigna sections: [] (el detalle prioriza body Portable Text).
 */
function normalizeSanityArticle(raw: SanityRawNoticia): NewsArticle {
  const coverVariant: 1 | 2 | 3 =
    raw.coverVariant === 1 || raw.coverVariant === 2 || raw.coverVariant === 3
      ? raw.coverVariant
      : 1;

  return {
    _id: raw._id,
    slug: raw.slug!,
    title: raw.title!,
    excerpt: raw.excerpt!,
    date: normalizeISODate(raw.date!),
    category: raw.category!,
    author: raw.author!,
    readTime: raw.readTime!,
    coverVariant,
    sections: [],
    featured: Boolean(raw.featured),
    mainImage: raw.mainImage?.url ? raw.mainImage : undefined,
    body: Array.isArray(raw.body) ? raw.body : undefined,
    socialMedia: Array.isArray(raw.socialMedia) ? raw.socialMedia : undefined,
    attachments: Array.isArray(raw.attachments) ? raw.attachments : undefined,
    seoTitle: raw.seoTitle || undefined,
    seoDescription: raw.seoDescription || undefined,
  };
}

/**
 * Obtiene todas las noticias publicadas con proyección resumida (tarjetas).
 *
 * Respaldo:
 * - Falta de configuración o error de red: activa datos estáticos.
 * - Documentos con datos inválidos: trata como error y activa respaldo estático.
 * - Array vacío legítimo: se respeta como vacío.
 */
export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!client) {
    return staticNewsArticles;
  }

  try {
    const rawArticles = await client.fetch(
      noticiasQuery,
      {},
      { next: { revalidate: 60 } }
    );

    if (!Array.isArray(rawArticles)) {
      return staticNewsArticles;
    }

    if (rawArticles.length === 0) {
      return [];
    }

    for (const doc of rawArticles) {
      if (!isValidSanityRawDoc(doc)) {
        console.error("[Sanity] Datos de noticia inválidos en noticiasQuery. Activando respaldo estático.");
        return staticNewsArticles;
      }
    }

    return rawArticles.map(normalizeSanityArticle);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar noticias: ${message}. Usando respaldo estático.`);
    return staticNewsArticles;
  }
}

/**
 * Obtiene las N noticias más recientes con proyección resumida y límite GROQ.
 * Utilizado por LatestNews en Home.
 */
export async function getLatestNewsArticles(limit: number = 3): Promise<NewsArticle[]> {
  if (!client) {
    return staticNewsArticles.slice(0, limit);
  }

  try {
    const rawArticles = await client.fetch(
      latestNoticiasQuery,
      { limit },
      { next: { revalidate: 60 } }
    );

    if (!Array.isArray(rawArticles)) {
      return staticNewsArticles.slice(0, limit);
    }

    if (rawArticles.length === 0) {
      return [];
    }

    for (const doc of rawArticles) {
      if (!isValidSanityRawDoc(doc)) {
        console.error("[Sanity] Datos de noticia inválidos en latestNoticiasQuery. Activando respaldo estático.");
        return staticNewsArticles.slice(0, limit);
      }
    }

    return rawArticles.map(normalizeSanityArticle);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar noticias recientes: ${message}. Usando respaldo estático.`);
    return staticNewsArticles.slice(0, limit);
  }
}

/**
 * Obtiene una noticia individual completa por su slug.
 * Exclusivamente esta consulta descarga body, SEO, socialMedia y attachments.
 */
export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  if (!client) {
    return getStaticArticleBySlug(slug) ?? null;
  }

  try {
    const rawArticle = await client.fetch(
      noticiaBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );

    if (!rawArticle) {
      return null;
    }

    if (!isValidSanityRawDoc(rawArticle)) {
      console.error(`[Sanity] Documento de noticia '${slug}' contiene datos inválidos. Activando respaldo estático.`);
      return getStaticArticleBySlug(slug) ?? null;
    }

    return normalizeSanityArticle(rawArticle);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar noticia '${slug}': ${message}. Usando respaldo estático.`);
    return getStaticArticleBySlug(slug) ?? null;
  }
}

/**
 * Consulta ultraligera de slugs y fechas para sitemap y generateStaticParams.
 * No descarga cuerpos, imágenes internas, videos ni PDFs.
 */
export async function getNoticiaSlugs(): Promise<Array<{ slug: string; date: string }>> {
  if (!client) {
    return staticNewsArticles.map((a) => ({ slug: a.slug, date: a.date }));
  }

  try {
    const rawSlugs = await client.fetch(
      noticiaSlugsQuery,
      {},
      { next: { revalidate: 60 } }
    );

    if (!Array.isArray(rawSlugs)) {
      return staticNewsArticles.map((a) => ({ slug: a.slug, date: a.date }));
    }

    const validSlugs: Array<{ slug: string; date: string }> = [];
    for (const item of rawSlugs) {
      if (
        typeof item?.slug === "string" &&
        item.slug.trim() &&
        isValidISODate(item?.date)
      ) {
        validSlugs.push({
          slug: item.slug.trim(),
          date: normalizeISODate(item.date),
        });
      } else {
        console.error("[Sanity] Slug o fecha inválida en noticiaSlugsQuery. Activando respaldo estático.");
        return staticNewsArticles.map((a) => ({ slug: a.slug, date: a.date }));
      }
    }

    return validSlugs;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar slugs: ${message}. Usando respaldo estático.`);
    return staticNewsArticles.map((a) => ({ slug: a.slug, date: a.date }));
  }
}
