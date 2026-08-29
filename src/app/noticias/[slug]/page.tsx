import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { newsArticles, getArticleBySlug, type NewsSection } from "@/lib/data/news";
import { NewsCover } from "@/components/news/NewsCover";
import { PageHero } from "@/components/shared/PageHero";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/noticias/${article.slug}`
    },
    openGraph: {
      title: `${article.title} · Alfonso Grados`,
      description: article.excerpt,
      url: `/noticias/${article.slug}`,
      images: ["/opengraph-image.png"]
    },
    twitter: {
      title: `${article.title} · Alfonso Grados`,
      description: article.excerpt,
      images: ["/twitter-image.png"]
    }
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function RenderSection({ section }: { section: NewsSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="mt-10 mb-4 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {section.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mb-5 text-[16px] leading-[1.75] text-foreground/75">
          {section.text}
        </p>
      );
    case "list":
      return (
        <ul className="mb-6 space-y-2 pl-5">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="relative text-[15px] leading-[1.7] text-foreground/70 before:absolute before:-left-4 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-yellow"
            >
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function ArticlePage({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        index="06"
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        meta={[
          { label: "Autor", value: article.author },
          { label: "Fecha", value: formatDate(article.date) },
          { label: "Lectura", value: article.readTime }
        ]}
      />

      <main id="main-content" className="container py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[72rem]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Cuerpo del artículo */}
            <div>
              {/* Portada visual grande en móvil y tablet */}
              <div className="mb-10 lg:hidden">
                <NewsCover article={article} className="h-52 w-full" />
              </div>

              {/* Secciones de contenido */}
              <div>
                {article.sections.map((section, i) => (
                  <RenderSection key={i} section={section} />
                ))}
              </div>

              {/* Volver al listado */}
              <div className="mt-12 border-t border-foreground/10 pt-8">
                <Link
                  href="/noticias"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-foreground/50 transition-colors duration-200 hover:text-brand-red"
                >
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M10 3L5 8L10 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Volver a Noticias
                </Link>
              </div>
            </div>

            {/* Sidebar: portada visual + meta lateral */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-6">
                <NewsCover article={article} className="h-64 w-full" />

                {/* Categoría */}
                <div className="rounded-xl border border-foreground/10 p-5">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/35">
                    Categoría
                  </p>
                  <p className="text-[14px] font-medium text-foreground/80">
                    {article.category}
                  </p>
                </div>

                {/* Sobre la campaña */}
                <div className="rounded-xl bg-brand-yellow/10 p-5">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-foreground/45">
                    Sobre la campaña
                  </p>
                  <p className="text-[13px] leading-relaxed text-foreground/65">
                    Alfonso Grados candidato a la Alcaldía de Yanahuara.
                    Propuestas concretas, transparencia y respeto por el
                    patrimonio del distrito.
                  </p>
                  <Link
                    href="/sumate"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-[12px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                  >
                    {/* WhatsApp icon */}
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Súmate a la campaña
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
