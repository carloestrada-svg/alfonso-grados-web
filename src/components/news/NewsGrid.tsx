import { NewsCard } from "./NewsCard";
import { FadeIn } from "@/components/shared/FadeIn";
import { news } from "@/lib/data/news";

export function NewsGrid() {
  const [featured, ...rest] = news;

  return (
    <section className="bg-background">
      <div className="container py-20 lg:py-24">
        <FadeIn
          staggerSelector="[data-news-card]"
          stagger={0.08}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured ? <NewsCard item={featured} featured /> : null}
          {rest.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
