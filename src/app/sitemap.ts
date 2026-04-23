import type { MetadataRoute } from "next";
import { news } from "@/lib/data/news";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/policies",
    "/news",
    "/get-involved",
    "/contact"
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8
  }));

  const newsRoutes = news.map((item) => ({
    url: absoluteUrl(`/news/${item.slug}`),
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...newsRoutes];
}
