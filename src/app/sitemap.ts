import type { MetadataRoute } from "next";
import { events } from "@/lib/data/events";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/events",
    "/volunteer",
    "/ask",
    "/donate",
    "/contact",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8
  }));

  const eventRoutes = events.map((item) => ({
    url: absoluteUrl(`/events/${item.id}`),
    lastModified: new Date(item.date),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...eventRoutes];
}
