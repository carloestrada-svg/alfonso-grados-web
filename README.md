# Morgan for Senate — Political Campaign Website

Production-ready campaign website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **GSAP** for scroll-driven motion.

## Stack

- Next.js 15 (App Router, RSC)
- TypeScript, strict mode
- Tailwind CSS + `tailwindcss-animate`
- shadcn/ui primitives (Radix under the hood)
- GSAP 3 + `@gsap/react` for scroll-reveal and parallax
- Lucide icons

## Getting Started

```bash
yarn install
yarn dev
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Start the dev server |
| `yarn build` | Production build |
| `yarn start` | Run the production build |
| `yarn lint` | Lint with Next's ESLint config |
| `yarn type-check` | Run `tsc --noEmit` |

## Project Structure

```
src/
  app/                  App Router routes
    (routes)            Home, About, Policies, News, Get Involved, Contact
    layout.tsx          Root layout: fonts, Navbar, Footer
    globals.css         Tailwind + design tokens
    sitemap.ts          Dynamic sitemap
    robots.ts           Robots policy
  components/
    layout/             Navbar, MobileNav, Footer, Container
    shared/             FadeIn, AnimatedHeading, PageHero, ParallaxSection, SectionHeader
    home/               Hero, MissionBand, KeyPolicies, Stats, Testimonials, NewsTeaser, CTASection
    about/              Biography, Timeline, Values
    policies/           PolicyHero, PolicyAccordion
    news/               NewsGrid, NewsCard
    get-involved/       VolunteerForm, DonateSection, EventsList
    contact/            ContactForm
    ui/                 shadcn/ui primitives
  lib/
    utils.ts            cn() helper
    data/               Placeholder content (candidate, policies, news, events, testimonials, navigation)
  hooks/
    useScrollReveal.ts  GSAP-based scroll-reveal hook
```

## Pages

- `/` — Home (hero, mission, key policies, stats, testimonials, news teaser, CTA)
- `/about` — Biography, timeline, values
- `/policies` — Policy positions in accordion
- `/news` — News grid with individual article pages (`/news/[slug]`)
- `/get-involved` — Volunteer form, donate CTA, upcoming events
- `/contact` — Contact form + campaign details

## Customizing

Replace placeholder content in `src/lib/data/*.ts`. Brand colors live in `tailwind.config.ts` under `theme.extend.colors.brand` and as CSS variables in `src/app/globals.css`.
