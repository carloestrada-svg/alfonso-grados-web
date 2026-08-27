import { type NewsArticle } from "@/lib/data/news";
import { cn } from "@/lib/utils";

type Props = {
  article: NewsArticle;
  className?: string;
  sizes?: string;
};

/** Paleta de variantes — sin imágenes externas, sólo formas y colores de campaña */
const VARIANTS: Record<
  1 | 2 | 3,
  { bg: string; shape: string; accent: string; label: string }
> = {
  1: {
    bg: "from-[#0A1F44] to-[#162B5E]",
    shape: "bg-[#F9D500]",
    accent: "text-[#F9D500]",
    label: "Propuestas"
  },
  2: {
    bg: "from-[#E4221E] to-[#9B0E0B]",
    shape: "bg-[#EEEC98]",
    accent: "text-[#EEEC98]",
    label: "Alfonso te explica"
  },
  3: {
    bg: "from-[#1A3A1A] to-[#0D240D]",
    shape: "bg-[#F9D500]",
    accent: "text-[#F9D500]",
    label: "Campaña"
  }
};

export function NewsCover({ article, className, sizes }: Props) {
  const v = VARIANTS[article.coverVariant];

  return (
    <div
      className={cn(
        "relative flex overflow-hidden rounded-xl bg-gradient-to-br",
        v.bg,
        className
      )}
      aria-hidden="true"
    >
      {/* Fondo decorativo — círculo grande */}
      <span
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-15",
          v.shape
        )}
      />

      {/* Cuadrado decorativo esquina inferior-izquierda */}
      <span
        className={cn(
          "pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rotate-12 rounded-2xl opacity-20",
          v.shape
        )}
      />

      {/* Línea decorativa */}
      <span
        className={cn(
          "pointer-events-none absolute left-6 top-6 h-px w-16 opacity-60",
          v.shape
        )}
      />

      {/* Contenido tipográfico */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6">
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-widest opacity-80",
            v.accent
          )}
        >
          {article.category}
        </p>
        <p className="line-clamp-2 font-display text-lg font-semibold leading-snug text-white">
          {article.title}
        </p>
        <p className="mt-1 text-xs text-white/50">{article.readTime} de lectura</p>
      </div>

      {/* Visibilidad de tamaño: prop ignorado, solo para compatibilidad futura */}
      {sizes && <span className="sr-only">{sizes}</span>}
    </div>
  );
}
