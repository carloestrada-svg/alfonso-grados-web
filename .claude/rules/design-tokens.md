# Design tokens

## Fonts

Loaded via `next/font/google` in `src/app/layout.tsx`:

- **Body / UI:** Inter → `font-sans` (Tailwind default)
- **Display:** Source Serif 4 (normal + italic) → `font-display`

Never swap fonts without updating `layout.tsx` AND `tailwind.config.ts` together.

## Colors (Tailwind brand palette)

```
brand.navy  #0A1F44  → used via text-foreground / bg-foreground
brand.red   #C8102E  → the single accent color
brand.cream #F4F1EA  → bg-brand-cream (section backgrounds)
brand.gold  #C9A227  → reserved, barely used
```

CSS vars in `globals.css`:
- `--background` (light cream, slightly lighter than brand-cream) → use `bg-background` for subtle section variation
- `--foreground` = navy

## Section background alternation

Prefer visual rhythm by alternating:
- `bg-foreground` (dark navy) — Stats
- `bg-brand-cream` — Mission, Testimonials, CTA
- `bg-background` — Endorsements, UpcomingEvents (near-white; subtle variation from cream)

Avoid two `bg-brand-cream` sections adjacent without a contrast interstitial.

## Type scale (explicit px)

Use pixel literals so the scale stays auditable:

- Meta / small caps: `text-[13px] font-medium uppercase tracking-[0.24em]`
- Support copy: `text-[15px] leading-[1.6]`
- Body: `text-[16px]` or `text-[17px] leading-[1.55]`
- Lede paragraph: `text-[18px]` or `text-[19px]`
- MagneticButton md: `text-[15px]`
- MagneticButton lg: `text-[16px]`
- Section H2 headlines: `clamp(2rem, 4.8vw, 3.1rem)`
- Page H1 hero: `clamp(2.5rem, 6.5vw, 4.75rem)`
- Home hero H1: `clamp(3rem, 9vw, 7.5rem)`

## Spacing

- Sections: `py-20 lg:py-28` or `py-24 lg:py-28`
- Header → body gap: `mt-16 lg:mt-24`
- Sidebar max width: `max-w-[22rem]`
- Hairline color: `bg-foreground/15` (or `/25` when stronger needed)

## Tracking / leading

- `tracking-[0.24em]` for uppercase small-caps meta
- `tracking-[-0.015em]` for serif titles 1.4–2.8rem
- `tracking-[-0.02em]` for display titles above 3rem
- `leading-[1.6]` for small body, `leading-[1.55]` for larger body

## Borders

- Hairline: `border-foreground/10` / `border-foreground/15` (on cream/white) or `border-white/10` (on dark).
- No `rounded-2xl bg-white shadow-lg` card patterns. If a card is unavoidable, use `border border-foreground/10 rounded-2xl` with no shadow.
