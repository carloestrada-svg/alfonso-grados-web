import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { getNoticiaSlugs } from "@/sanity/lib/news";
import { getEventoSlugs } from "@/sanity/lib/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/conoce-a-alfonso",
    "/agenda",
    "/noticias",
    "/sumate",
    "/preguntale-a-alfonso",
    "/contacto",
    "/politica-de-privacidad",
    "/terminos-y-condiciones",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const [noticiaSlugs, eventoSlugs] = await Promise.all([
    getNoticiaSlugs(),
    getEventoSlugs(),
  ]);

  const articleRoutes = noticiaSlugs.map((item) => ({
    url: absoluteUrl(`/noticias/${item.slug}`),
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const eventRoutes = eventoSlugs.map((item) => ({
    url: absoluteUrl(`/agenda/${item.slug}`),
    ...(item.updatedAt ? { lastModified: new Date(item.updatedAt) } : {}),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes, ...eventRoutes];
}
