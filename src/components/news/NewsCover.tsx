import { type NewsArticle } from "@/lib/data/news";
import { cn } from "@/lib/utils";

type Props = {
  article: NewsArticle;
  className?: string;
  sizes?: string;
};

/**
 * Composiciones visuales usando exclusivamente la paleta oficial de campaña:
 *   #F9D500  amarillo principal
 *   #E4221E  rojo acento
 *   #EEEC98  amarillo claro
 *   #0A0A0A  negro
 *   #FFFFFF  blanco
 *
 * Variante 1 — fondo negro, formas amarillo/rojo     (Propuestas)
 * Variante 2 — fondo rojo,   formas amarillo claro   (Alfonso te explica)
 * Variante 3 — fondo amarillo, formas negro/rojo     (Campaña / genérico)
 */
const VARIANTS: Record<
  1 | 2 | 3,
  {
    bg: string;
    circleColor: string;
    squareColor: string;
    lineColor: string;
    accentText: string;
    titleColor: string;
    metaColor: string;
  }
> = {
  1: {
    bg: "bg-[#0A0A0A]",
    circleColor: "bg-[#F9D500]",
    squareColor: "bg-[#E4221E]",
    lineColor: "bg-[#F9D500]",
    accentText: "text-[#F9D500]",
    titleColor: "text-white",
    metaColor: "text-white/50"
  },
  2: {
    bg: "bg-[#E4221E]",
    circleColor: "bg-[#EEEC98]",
    squareColor: "bg-[#0A0A0A]",
    lineColor: "bg-[#EEEC98]",
    accentText: "text-[#EEEC98]",
    titleColor: "text-white",
    metaColor: "text-white/60"
  },
  3: {
    bg: "bg-[#F9D500]",
    circleColor: "bg-[#0A0A0A]",
    squareColor: "bg-[#E4221E]",
    lineColor: "bg-[#0A0A0A]",
    accentText: "text-[#E4221E]",
    titleColor: "text-[#0A0A0A]",
    metaColor: "text-[#0A0A0A]/50"
  }
};

export function NewsCover({ article, className, sizes }: Props) {
  const v = VARIANTS[article.coverVariant];

  return (
    <div
      className={cn(
        "relative flex overflow-hidden rounded-xl",
        v.bg,
        className
      )}
      aria-hidden="true"
    >
      {/* Círculo decorativo — esquina superior derecha */}
      <span
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-15",
          v.circleColor
        )}
      />

      {/* Cuadrado decorativo — esquina inferior izquierda */}
      <span
        className={cn(
          "pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rotate-12 rounded-2xl opacity-20",
          v.squareColor
        )}
      />

      {/* Línea horizontal decorativa — esquina superior izquierda */}
      <span
        className={cn(
          "pointer-events-none absolute left-6 top-6 h-px w-16 opacity-60",
          v.lineColor
        )}
      />

      {/* Contenido tipográfico */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-6">
        <p
          className={cn(
            "mb-2 text-xs font-semibold uppercase tracking-widest opacity-80",
            v.accentText
          )}
        >
          {article.category}
        </p>
        <p
          className={cn(
            "line-clamp-2 font-display text-lg font-semibold leading-snug",
            v.titleColor
          )}
        >
          {article.title}
        </p>
        <p className={cn("mt-1 text-xs", v.metaColor)}>
          {article.readTime} de lectura
        </p>
      </div>

      {/* Prop sizes — solo para compatibilidad futura */}
      {sizes && <span className="sr-only">{sizes}</span>}
    </div>
  );
}
