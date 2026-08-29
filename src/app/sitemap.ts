import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { newsArticles } from "@/lib/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const articleRoutes = newsArticles.map((article) => ({
    url: absoluteUrl(`/noticias/${article.slug}`),
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  // Individual event URLs are omitted until real events exist.
  return [...staticRoutes, ...articleRoutes];
}
