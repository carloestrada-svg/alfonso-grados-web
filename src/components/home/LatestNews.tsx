import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestNewsArticles } from "@/sanity/lib/news";
import { NewsCard } from "@/components/news/NewsCard";

export async function LatestNews() {
  const articles = await getLatestNewsArticles(3);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-background border-t border-foreground/10 py-20 sm:py-24 lg:py-28">
      <div className="container">
        {/* Encabezado sin número para preservar la numeración oficial */}
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20 mb-12 sm:mb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.24em] text-foreground/55">
              <span className="h-px w-8 bg-foreground/25" />
              <span>Actualidad</span>
            </div>
            <p className="max-w-[22rem] text-[15px] leading-[1.6] text-foreground/60">
              Conoce las propuestas de Alfonso para Yanahuara.
            </p>
          </div>

          <div>
            <h2 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-foreground">
              <span
                className="block"
                style={{ fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)" }}
              >
                Noticias
              </span>
            </h2>
          </div>
        </div>

        {/* Grilla: 1 col móvil, 2 cols tableta, 3 cols escritorio */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} headingLevel="h3" />
          ))}
        </div>

        {/* Enlace visible al final */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/noticias"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-7 py-3 text-[13.5px] font-semibold uppercase tracking-wider text-foreground shadow-sm transition-all duration-300 hover:border-brand-red hover:bg-brand-yellow/10 hover:text-brand-red hover:shadow"
          >
            <span>Ver todas las noticias</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
