import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import type { NewsSocialItem } from "@/lib/data/news";

function isValidHttpUrl(urlStr?: string): boolean {
  if (!urlStr || typeof urlStr !== "string") return false;
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Extrae y valida de forma estricta el identificador de 11 caracteres de un video de YouTube.
 * Admite: youtube.com/watch?v=ID, youtu.be/ID, /shorts/ID, /live/ID, /embed/ID.
 */
function extractYouTubeVideoId(urlStr: string): string | null {
  if (!isValidHttpUrl(urlStr)) return null;
  try {
    const url = new URL(urlStr);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0].split("?")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        const id = url.searchParams.get("v");
        return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }
      const match = url.pathname.match(
        /^\/(?:shorts|live|embed)\/([a-zA-Z0-9_-]{11})/
      );
      if (match) {
        return match[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function SocialMediaSection({ items }: { items?: NewsSocialItem[] }) {
  const validItems = (items || []).filter((item) => isValidHttpUrl(item.url));
  if (validItems.length === 0) {
    return null;
  }

  return (
    <section aria-label="Videos y publicaciones" className="mt-14 border-t border-foreground/10 pt-10">
      <h3 className="mb-6 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        Videos y publicaciones relacionadas
      </h3>

      <div className="space-y-8">
        {validItems.map((item) => {
          const ytVideoId =
            item.platform.toLowerCase().includes("youtube") ||
            item.url.toLowerCase().includes("youtu")
              ? extractYouTubeVideoId(item.url)
              : null;

          if (ytVideoId) {
            return (
              <div
                key={item._key}
                className="overflow-hidden rounded-2xl border border-foreground/10 bg-card p-4 shadow-sm sm:p-6"
              >
                <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/10 px-2.5 py-1 text-red-600">
                    <Play className="h-3 w-3 fill-current" /> YouTube · {item.contentType}
                  </span>
                </div>

                <h4 className="mb-3 font-display text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="mb-4 text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                )}

                {/* Reproductor responsivo 16:9 con youtube-nocookie.com */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ytVideoId}`}
                    title={item.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            );
          }

          // Tarjeta para Facebook, Instagram, TikTok, X o YouTube con ID no extraíble
          return (
            <div
              key={item._key}
              className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-foreground/10 bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              {item.thumbnail?.url && (
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-36">
                  <Image
                    src={item.thumbnail.url}
                    alt={item.thumbnail.alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 150px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
                  <span className="rounded-full bg-brand-yellow/20 px-2 py-0.5 text-foreground/75">
                    {item.platform}
                  </span>
                  <span>·</span>
                  <span>{item.contentType}</span>
                </div>
                <h4 className="truncate font-display text-base font-semibold text-foreground">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-foreground/65">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="shrink-0 pt-2 sm:pt-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-foreground/15 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  <span>Ver contenido</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
