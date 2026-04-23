import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { FadeIn } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news/NewsCard";
import { formatDate } from "@/lib/utils";
import { news, getNewsBySlug } from "@/lib/data/news";

export async function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image }],
      type: "article",
      publishedTime: item.date
    }
  };
}

export default async function NewsArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const related = news.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/50"
        />
        <div className="container relative py-20 lg:py-28">
          <FadeIn>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to news
            </Link>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="accent">{item.category}</Badge>
            <time dateTime={item.date} className="text-sm text-white/80">
              {formatDate(item.date)}
            </time>
            <span aria-hidden className="text-white/40">
              ·
            </span>
            <span className="text-sm text-white/80">{item.readTime}</span>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-sm uppercase tracking-wide text-white/60">
              By {item.author}
            </p>
          </FadeIn>
        </div>
      </section>

      <article className="bg-background">
        <div className="container py-16 lg:py-20">
          <FadeIn
            staggerSelector="p"
            stagger={0.06}
            className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-foreground/85"
          >
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </FadeIn>

          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-3">
            <Button asChild variant="accent">
              <Link href="/get-involved#donate">Support the campaign</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/news">More news</Link>
            </Button>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-border/60 bg-brand-cream">
          <div className="container py-16 lg:py-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              More from the campaign
            </h2>
            <FadeIn
              staggerSelector="[data-news-card]"
              stagger={0.08}
              className="mt-8 grid gap-6 md:grid-cols-3"
            >
              {related.map((r) => (
                <NewsCard key={r.slug} item={r} />
              ))}
            </FadeIn>
          </div>
        </section>
      ) : null}
    </>
  );
}
