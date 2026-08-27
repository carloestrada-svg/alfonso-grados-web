import Link from "next/link";
import { type NewsArticle } from "@/lib/data/news";
import { NewsCover } from "@/components/news/NewsCover";
import { cn } from "@/lib/utils";

type Props = {
  article: NewsArticle;
  className?: string;
  featured?: boolean;
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export function NewsCard({ article, className, featured = false }: Props) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-card shadow-sm transition-shadow duration-300 hover:shadow-md",
        featured && "lg:flex-row",
        className
      )}
    >
      {/* Portada visual */}
      <Link
        href={`/noticias/${article.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          "block shrink-0",
          featured ? "lg:w-80 xl:w-96" : "w-full"
        )}
      >
        <NewsCover
          article={article}
          className={cn(
            "h-48 w-full transition-transform duration-500 group-hover:scale-[1.02]",
            featured && "lg:h-full"
          )}
        />
      </Link>

      {/* Cuerpo de la tarjeta */}
      <div className="flex flex-1 flex-col p-6">
        {/* Categoría y tiempo de lectura */}
        <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-foreground/45">
          <span className="rounded-full bg-brand-yellow/20 px-2 py-0.5 text-foreground/70">
            {article.category}
          </span>
          <span>{article.readTime} de lectura</span>
        </div>

        {/* Título */}
        <h2
          className={cn(
            "font-display font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand-red",
            featured ? "text-2xl" : "text-lg"
          )}
        >
          <Link href={`/noticias/${article.slug}`}>{article.title}</Link>
        </h2>

        {/* Extracto */}
        <p className="mt-3 line-clamp-3 flex-1 text-[14px] leading-relaxed text-foreground/60">
          {article.excerpt}
        </p>

        {/* Pie: autor y fecha */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-foreground/8 pt-4 text-[12px] text-foreground/45">
          <span className="truncate">{article.author}</span>
          <time dateTime={article.date} className="shrink-0">
            {formatDate(article.date)}
          </time>
        </div>
      </div>
    </article>
  );
}
