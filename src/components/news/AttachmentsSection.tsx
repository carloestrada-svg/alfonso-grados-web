import { FileText, Download, ExternalLink } from "lucide-react";
import type { NewsAttachment } from "@/lib/data/news";

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isValidSanityPdfUrl(urlStr?: string): boolean {
  if (!urlStr || typeof urlStr !== "string") return false;
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === "https:" && parsed.hostname === "cdn.sanity.io";
  } catch {
    return false;
  }
}

export function AttachmentsSection({ items }: { items?: NewsAttachment[] }) {
  const validItems = (items || []).filter((item) => isValidSanityPdfUrl(item.url));
  if (validItems.length === 0) {
    return null;
  }

  return (
    <section aria-label="Documentos adjuntos" className="mt-12 border-t border-foreground/10 pt-10">
      <h3 className="mb-6 font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        Documentos adjuntos
      </h3>

      <div className="space-y-4">
        {validItems.map((item) => {
          const sizeStr = formatFileSize(item.size);
          const fileName = item.originalFilename || `${item.title}.pdf`;
          // Descarga directa utilizando el parámetro ?dl= de Sanity
          const downloadUrl = `${item.url}?dl=${encodeURIComponent(fileName)}`;

          return (
            <div
              key={item._key}
              className="flex flex-col gap-4 rounded-xl border border-foreground/10 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h4 className="truncate font-display text-sm font-semibold text-foreground sm:text-base">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-foreground/65">
                      {item.description}
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-foreground/45">
                    {fileName} {sizeStr && `· ${sizeStr}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 shrink-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-foreground/15 bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  <span>Abrir PDF</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={downloadUrl}
                  download={fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <span>Descargar</span>
                  <Download className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
