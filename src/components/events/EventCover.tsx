import Image from "next/image";
import type { CampaignEvent } from "@/lib/data/events";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

type Props = {
  event: CampaignEvent;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function EventCover({ event, className, sizes, priority }: Props) {
  if (event.mainImage?.url) {
    const width = event.mainImage.dimensions?.width || 800;
    const height = event.mainImage.dimensions?.height || 450;
    const alt = event.mainImage.alt || event.title;

    return (
      <div
        className={cn(
          "relative flex overflow-hidden rounded-xl bg-foreground/5",
          className
        )}
      >
        <Image
          src={event.mainImage.url}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  // Composición gráfica oficial de campaña como respaldo
  return (
    <div
      className={cn(
        "relative flex flex-col justify-end overflow-hidden rounded-xl bg-[#0A0A0A] p-6",
        className
      )}
      aria-hidden="true"
    >
      {/* Elementos decorativos de campaña */}
      <span className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#F9D500] opacity-15" />
      <span className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rotate-12 rounded-xl bg-[#E4221E] opacity-20" />
      <span className="pointer-events-none absolute left-5 top-5 h-px w-12 bg-[#F9D500] opacity-60" />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F9D500]">
          <Calendar className="h-3.5 w-3.5" />
          <span>Yanahuara</span>
        </div>
        <p className="line-clamp-2 font-display text-base font-semibold leading-snug text-white sm:text-lg">
          {event.title}
        </p>
      </div>
    </div>
  );
}
