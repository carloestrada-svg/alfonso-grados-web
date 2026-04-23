import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { NewsItem } from "@/lib/data/news";

type Props = {
  item: NewsItem;
  featured?: boolean;
};

export function NewsCard({ item, featured }: Props) {
  return (
    <Link
      href={`/news/${item.slug}`}
      data-news-card
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-0" : ""
      }`}
    >
      <div
        aria-hidden
        className={`bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03] ${
          featured ? "aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"
        }`}
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="accent">{item.category}</Badge>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <span aria-hidden>·</span>
          <span>{item.readTime}</span>
        </div>
        <h3
          className={`font-display font-semibold leading-snug tracking-tight group-hover:text-brand-red ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
          Read the story
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
