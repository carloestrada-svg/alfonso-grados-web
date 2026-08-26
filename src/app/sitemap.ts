import type { MetadataRoute } from "next";
import { fetchGHLEvents } from "@/lib/ghl";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/about",
    "/events",
    "/volunteer",
    "/ask",
    "/contact",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8
  }));

  const events = await fetchGHLEvents();
  const eventRoutes = events.map((item) => ({
    url: absoluteUrl(`/events/${item.id}`),
    lastModified: item.date.raw ? new Date(item.date.raw) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...eventRoutes];
}
