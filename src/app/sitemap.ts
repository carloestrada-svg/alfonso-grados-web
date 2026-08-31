import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { getNoticiaSlugs } from "@/sanity/lib/news";

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
    "/terminos-y-condiciones"
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8
  }));

  const slugs = await getNoticiaSlugs();
  const articleRoutes = slugs.map((item) => ({
    url: absoluteUrl(`/noticias/${item.slug}`),
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  // Individual event URLs are omitted until real events exist.
  return [...staticRoutes, ...articleRoutes];
}
