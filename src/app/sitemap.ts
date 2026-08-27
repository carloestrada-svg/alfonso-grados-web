import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Individual event URLs are omitted until real events exist.
  return staticRoutes;
}
