import type { Metadata } from "next";
import { getNewsArticles } from "@/sanity/lib/news";
import { NewsCard } from "@/components/news/NewsCard";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Propuestas, explicaciones y novedades de la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
  alternates: {
    canonical: "/noticias"
  },
  openGraph: {
    title: "Noticias · Alfonso Grados",
    description:
      "Propuestas, explicaciones y novedades de la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
    url: "/noticias",
    images: ["/opengraph-image.png"]
  },
  twitter: {
    title: "Noticias · Alfonso Grados",
    description:
      "Propuestas, explicaciones y novedades de la campaña de Alfonso Grados para la Alcaldía de Yanahuara.",
    images: ["/twitter-image.png"]
  }
};

export default async function NoticiasPage() {
  const articles = await getNewsArticles();
  const featuredIndex = articles.findIndex((a) => a.featured);
  const featured = featuredIndex !== -1 ? articles[featuredIndex] : null;
  const rest = featured ? articles.filter((_, idx) => idx !== featuredIndex) : articles;

  return (
    <>
      <PageHero
        index="06"
        eyebrow="Noticias"
        title={"Lo que Alfonso\u00A0propone"}
        emphasis={"\u00A0propone"}
        description="Propuestas, explicaciones y novedades de la campaña. Aquí puedes leer, en detalle, el plan de trabajo para Yanahuara."
      />

      <div className="container py-16 sm:py-20 lg:py-24">
        {/* Artículo destacado */}
        {featured && (
          <section aria-label="Artículo destacado" className="mb-16">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-foreground/45">
              Destacado
            </p>
            <NewsCard article={featured} featured />
          </section>
        )}

        {/* Resto de artículos */}
        {rest.length > 0 && (
          <section aria-label="Más artículos">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-widest text-foreground/45">
              Más artículos
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {rest.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        {articles.length === 0 && (
          <p className="text-center text-foreground/50">
            Próximamente publicaremos nuevos artículos.
          </p>
        )}
      </div>
    </>
  );
}
