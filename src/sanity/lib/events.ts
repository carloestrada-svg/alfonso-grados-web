import "server-only";

import { client } from "./client";
import {
  latestEventosQuery,
  eventosAgendaQuery,
  eventoBySlugQuery,
  eventoSlugsQuery,
} from "./queries";
import {
  events as staticEvents,
  getEventBySlug as getStaticEventBySlug,
  type CampaignEvent,
} from "@/lib/data/events";

type SanityRawEvento = {
  _id?: string;
  slug?: string;
  title?: string;
  startDateTime?: string;
  endDateTime?: string;
  city?: string;
  venue?: string;
  description?: string;
  registrationLink?: string;
  featured?: boolean;
  status?: string;
  mainImage?: {
    url?: string;
    alt?: string;
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
  _updatedAt?: string;
};

/**
 * Valida que una cadena represente una fecha ISO válida.
 */
function isValidISODate(dateStr: unknown): boolean {
  if (typeof dateStr !== "string" || !dateStr.trim()) {
    return false;
  }
  const timestamp = Date.parse(dateStr);
  return !Number.isNaN(timestamp);
}

/**
 * Valida de forma defensiva si una URL pertenece a http o https.
 */
function sanitizeHttpUrl(urlStr?: unknown): string | undefined {
  if (typeof urlStr !== "string" || !urlStr.trim()) {
    return undefined;
  }
  try {
    const parsed = new URL(urlStr.trim());
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // URL malformada
  }
  return undefined;
}

/**
 * Valida que la URL de imagen sea HTTPS y provenga exclusivamente de cdn.sanity.io.
 */
function isValidSanityImageUrl(urlStr?: unknown): boolean {
  if (typeof urlStr !== "string" || !urlStr.trim()) {
    return false;
  }
  try {
    const parsed = new URL(urlStr.trim());
    return parsed.protocol === "https:" && parsed.hostname === "cdn.sanity.io";
  } catch {
    return false;
  }
}

/**
 * Valida que las dimensiones de la imagen sean números positivos cuando existan.
 */
function isValidImageDimensions(dimensions?: unknown): boolean {
  if (!dimensions) {
    return true;
  }
  if (typeof dimensions !== "object") {
    return false;
  }
  const dims = dimensions as { width?: unknown; height?: unknown };
  if (dims.width !== undefined && (typeof dims.width !== "number" || dims.width <= 0)) {
    return false;
  }
  if (dims.height !== undefined && (typeof dims.height !== "number" || dims.height <= 0)) {
    return false;
  }
  return true;
}

/**
 * Valida exhaustivamente que un documento de evento recibido desde Sanity
 * tenga los campos obligatorios íntegros, valores permitidos y relaciones cronológicas lógicas.
 */
function isValidSanityRawEvento(raw: unknown): raw is SanityRawEvento {
  if (!raw || typeof raw !== "object") {
    return false;
  }
  const doc = raw as Record<string, unknown>;

  if (typeof doc.slug !== "string" || !doc.slug.trim()) return false;
  if (typeof doc.title !== "string" || !doc.title.trim()) return false;
  if (!isValidISODate(doc.startDateTime)) return false;

  // Si endDateTime existe: debe ser fecha válida y no anterior a startDateTime
  if (doc.endDateTime) {
    if (!isValidISODate(doc.endDateTime)) return false;
    if (new Date(doc.endDateTime as string) < new Date(doc.startDateTime as string)) {
      return false;
    }
  }

  if (typeof doc.city !== "string" || !doc.city.trim()) return false;
  if (typeof doc.venue !== "string" || !doc.venue.trim()) return false;
  if (typeof doc.description !== "string" || !doc.description.trim()) return false;

  // status debe ser exactamente 'programada' o 'cancelada'
  if (doc.status !== "programada" && doc.status !== "cancelada") {
    return false;
  }

  // featured, si existe, debe ser estrictamente booleano
  if (doc.featured !== undefined && typeof doc.featured !== "boolean") {
    return false;
  }

  // mainImage: si existe, su URL debe ser HTTPS de cdn.sanity.io y dimensiones válidas
  if (doc.mainImage) {
    if (typeof doc.mainImage !== "object") return false;
    const img = doc.mainImage as { url?: unknown; dimensions?: unknown };
    if (img.url !== undefined) {
      if (!isValidSanityImageUrl(img.url)) return false;
      if (!isValidImageDimensions(img.dimensions)) return false;
    }
  }

  return true;
}

/**
 * Normaliza un documento validado de Sanity hacia el tipo CampaignEvent.
 * Mantiene startDateTime y endDateTime como strings ISO serializables para Server Components.
 */
function normalizeSanityEvento(raw: SanityRawEvento): CampaignEvent {
  const status: "programada" | "cancelada" =
    raw.status === "cancelada" ? "cancelada" : "programada";

  const mainImage =
    raw.mainImage && isValidSanityImageUrl(raw.mainImage.url)
      ? {
          url: raw.mainImage.url!,
          alt: typeof raw.mainImage.alt === "string" ? raw.mainImage.alt.trim() : undefined,
          dimensions:
            raw.mainImage.dimensions &&
            typeof raw.mainImage.dimensions.width === "number" &&
            raw.mainImage.dimensions.width > 0 &&
            typeof raw.mainImage.dimensions.height === "number" &&
            raw.mainImage.dimensions.height > 0
              ? {
                  width: raw.mainImage.dimensions.width,
                  height: raw.mainImage.dimensions.height,
                  aspectRatio:
                    typeof raw.mainImage.dimensions.aspectRatio === "number"
                      ? raw.mainImage.dimensions.aspectRatio
                      : raw.mainImage.dimensions.width / raw.mainImage.dimensions.height,
                }
              : undefined,
        }
      : undefined;

  return {
    _id: raw._id,
    id: raw._id,
    slug: raw.slug!,
    title: raw.title!,
    startDateTime: raw.startDateTime!,
    endDateTime: raw.endDateTime ? raw.endDateTime : undefined,
    city: raw.city!,
    venue: raw.venue!,
    description: raw.description!,
    registrationLink: sanitizeHttpUrl(raw.registrationLink),
    featured: Boolean(raw.featured),
    status,
    mainImage,
  };
}

/**
 * Obtiene los próximos N eventos vigentes para la portada (Home).
 * Solo incluye eventos con estado 'programada' (incluyendo los que están en curso).
 */
export async function getUpcomingEvents(limit: number = 3): Promise<CampaignEvent[]> {
  if (!client) {
    return staticEvents.slice(0, limit);
  }

  const now = new Date().toISOString();

  try {
    const rawEvents = await client.fetch(
      latestEventosQuery,
      { now, limit },
      { next: { revalidate: 60 } }
    );

    if (!Array.isArray(rawEvents)) {
      return staticEvents.slice(0, limit);
    }

    if (rawEvents.length === 0) {
      return [];
    }

    for (const doc of rawEvents) {
      if (!isValidSanityRawEvento(doc)) {
        console.error("[Sanity] Documento de evento inválido en latestEventosQuery. Activando respaldo.");
        return staticEvents.slice(0, limit);
      }
    }

    return rawEvents.map(normalizeSanityEvento);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar eventos para Home: ${message}. Usando respaldo.`);
    return staticEvents.slice(0, limit);
  }
}

/**
 * Obtiene todos los eventos vigentes para la página de Agenda (/agenda).
 * Incluye eventos programados y cancelados vigentes, ordenados por startDateTime asc.
 */
export async function getAgendaEvents(): Promise<CampaignEvent[]> {
  if (!client) {
    return staticEvents;
  }

  const now = new Date().toISOString();

  try {
    const rawEvents = await client.fetch(
      eventosAgendaQuery,
      { now },
      { next: { revalidate: 60 } }
    );

    if (!Array.isArray(rawEvents)) {
      return staticEvents;
    }

    if (rawEvents.length === 0) {
      return [];
    }

    for (const doc of rawEvents) {
      if (!isValidSanityRawEvento(doc)) {
        console.error("[Sanity] Documento de evento inválido en eventosAgendaQuery. Activando respaldo.");
        return staticEvents;
      }
    }

    return rawEvents.map(normalizeSanityEvento);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar eventos de agenda: ${message}. Usando respaldo.`);
    return staticEvents;
  }
}

/**
 * Obtiene el detalle de un evento por su slug para la página individual (/agenda/[slug]).
 * Accesible mientras el documento esté publicado, incluso si ya concluyó o fue cancelado.
 */
export async function getEventBySlug(slug: string): Promise<CampaignEvent | null> {
  if (!client) {
    return getStaticEventBySlug(slug) ?? null;
  }

  try {
    const rawEvent = await client.fetch(
      eventoBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );

    if (!rawEvent) {
      return null;
    }

    if (!isValidSanityRawEvento(rawEvent)) {
      console.error(`[Sanity] Evento '${slug}' contiene datos inválidos. Activando respaldo.`);
      return getStaticEventBySlug(slug) ?? null;
    }

    return normalizeSanityEvento(rawEvent);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar evento '${slug}': ${message}. Usando respaldo.`);
    return getStaticEventBySlug(slug) ?? null;
  }
}

/**
 * Consulta ultraligera de slugs y fecha de actualización para sitemap y generateStaticParams.
 */
export async function getEventoSlugs(): Promise<Array<{ slug: string; updatedAt?: string }>> {
  if (!client) {
    return staticEvents.map((e) => ({
      slug: e.slug,
    }));
  }

  try {
    const rawSlugs = await client.fetch(
      eventoSlugsQuery,
      {},
      { next: { revalidate: 60 } }
    );

    if (!Array.isArray(rawSlugs)) {
      return staticEvents.map((e) => ({
        slug: e.slug,
      }));
    }

    const validSlugs: Array<{ slug: string; updatedAt?: string }> = [];
    for (const item of rawSlugs) {
      if (typeof item?.slug === "string" && item.slug.trim()) {
        const updatedAt = isValidISODate(item?._updatedAt)
          ? (item._updatedAt as string)
          : undefined;
        validSlugs.push({
          slug: item.slug.trim(),
          updatedAt,
        });
      } else {
        console.error("[Sanity] Slug inválido en eventoSlugsQuery. Activando respaldo.");
        return staticEvents.map((e) => ({
          slug: e.slug,
        }));
      }
    }

    return validSlugs;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error(`[Sanity] Error al consultar slugs de eventos: ${message}. Usando respaldo.`);
    return staticEvents.map((e) => ({
      slug: e.slug,
    }));
  }
}
