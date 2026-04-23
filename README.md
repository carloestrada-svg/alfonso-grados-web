# Morgan for Senate — Political Campaign Website

Campaign website for **Alex Morgan for U.S. Senate (California)**. Built on the Next.js App Router with an editorial, typographic design language — not a SaaS template. Forms flow into GoHighLevel (GHL) via webhook triggers, and event listings pull from a GHL Custom Object.

## Stack

- **Next.js 15.5** (App Router, React Server Components)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3** + `tailwindcss-animate`
- **GSAP 3** + `@gsap/react` for scroll-reveal, parallax, and hover motion
- **Radix UI** primitives (`@radix-ui/react-*`) with shadcn-style wrappers in `src/components/ui/`
- **Lucide** icons
- **Fonts:** Inter (UI / body) + Source Serif 4 (display, regular + italic) via `next/font/google`
- **GoHighLevel** integration for form submissions (webhooks) and event data (Custom Object REST API)

## Getting Started

```bash
yarn install
yarn dev
```

Open http://localhost:3000.

### Environment Variables

Create a `.env.local` at the project root:

```bash
# Public site URL (used in sitemap / layout metadata)
NEXT_PUBLIC_SITE_URL=https://morganforsenate.com

# GHL REST API credentials (required only for live event fetching and RSVP appointments)
GHL_API_KEY=your-ghl-api-key
GHL_LOCATION_ID=your-ghl-location-id

# Shared compliance webhook — fanned out in parallel with every phone-collecting form
GHL_COMPLIANCE_WEBHOOK=https://services.leadconnectorhq.com/hooks/.../webhook-trigger/<uuid>
```

When `GHL_API_KEY` / `GHL_LOCATION_ID` are absent, event pages fall back to the local static events in `src/lib/data/events.ts` — the site still renders end-to-end without credentials.

## Scripts

| Command | What it does |
| --- | --- |
| `yarn dev` | Start the Next.js dev server |
| `yarn build` | Production build |
| `yarn start` | Run the production build |
| `yarn lint` | Lint with `next lint` |
| `yarn type-check` | Run `tsc --noEmit` |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, mission, stats, endorsements, upcoming events, CTA |
| `/about` | Biography, timeline, values |
| `/events` | Campaign events list (GHL-backed, 60s ISR) |
| `/events/[id]` | Event detail + inline RSVP form |
| `/volunteer` | Volunteer sign-up |
| `/ask` | Ask-the-candidate form |
| `/donate` | ActBlue-bound donation flow |
| `/contact` | Contact form |
| `/privacy`, `/terms` | Legal pages |
| `/thank-you` | Shared post-submission landing |
| `/not-found` | 404 |

## Forms & GHL Integration

All forms are client components that POST to local API routes under `src/app/api/*`. Each API route forwards the payload to one or more GHL webhook triggers using `postGhlWebhooksParallel` (parallel fan-out with per-URL `.catch`). A route returns `502` only if **every** webhook fails.

| Form | Route | Webhooks |
| --- | --- | --- |
| Contact | `/api/contact` | primary + compliance |
| Volunteer | `/api/volunteer` | 3 workflow webhooks + compliance |
| Ask | `/api/ask` | primary |
| RSVP | `/api/events/rsvp` | primary + compliance, + optional GHL calendar appointment |

### Forms Compliance Pattern

Every form that collects a phone number ships three coupled behaviors (see `.claude/rules/forms-compliance-pattern.md`):

1. A **compliance webhook** is appended to the route's `WEBHOOK_URLS` array and posted in parallel.
2. The phone field is canonicalized to `+1 (xxx) xxx-xxxx` via `formatPhoneInput` on the client and `normalizePhoneForSubmit` on the server (see `src/lib/phone.ts`).
3. **SMS consent checkboxes** are disabled when the phone field is empty, `required` when it has a value, and auto-reset if the user deletes the phone after ticking them.

## Events Integration

Events live in a GHL **Custom Object** (schema key `custom_objects.events`). `src/lib/ghl.ts` exposes:

- `fetchGHLEvents()` — POSTs to `/objects/custom_objects.events/records/search`, normalizes and sorts chronologically.
- `fetchGHLEvent(id)` — GETs a single record by id.

Both are server-only, 60s ISR-cached, and wrapped by `/api/events` and `/api/events/[id]`. The RSVP flow optionally creates a GHL calendar appointment after the webhook succeeds (calendar `UTM5EkrGwiZjQyc19WGN`).

Time slugs (`600_pm`) and category slugs (`town_hall`) are mapped to human labels via `TIME_LABELS` / `CATEGORY_LABELS`.

## Project Structure

```
src/
  app/                         App Router routes
    layout.tsx                 Root layout — fonts, Navbar, Footer
    globals.css                Tailwind + CSS variables
    sitemap.ts                 Dynamic sitemap
    robots.ts                  Robots policy
    (routes)/                  Home, about, events, volunteer, ask, donate,
                                contact, privacy, terms, thank-you, not-found
    api/
      ask/route.ts             POST → GHL ask webhook
      contact/route.ts         POST → GHL contact + compliance webhooks
      volunteer/route.ts       POST → 3 GHL volunteer webhooks + compliance
      events/route.ts          GET  → list events (GHL custom object)
      events/[id]/route.ts     GET  → single event
      events/rsvp/route.ts     POST → RSVP webhook + optional appointment
  components/
    layout/                    Navbar, MobileNav, Footer, FooterLink,
                                NewsletterForm, Container
    shared/                    AnimatedHeading, FadeIn, FormField, LegalSection,
                                PageHero, ParallaxSection, SectionHeader,
                                SubmitButton
    home/                      Hero, MissionBand, Endorsements, Stats,
                                Testimonials, UpcomingEvents, CTASection
    about/                     Biography, Timeline, Values
    events/                    EventsList, EventDetails, RSVPForm
    volunteer/                 VolunteerForm
    contact/                   ContactForm
    ask/                       AskForm
    donate/                    DonateForm
    ui/                        shadcn-style primitives (button, input, select…)
                                + MagneticButton
  hooks/
    useScrollReveal.ts         GSAP-based scroll-reveal hook
    useParallax.ts             GSAP parallax hook
  lib/
    utils.ts                   cn() helper, absoluteUrl()
    phone.ts                   formatPhoneInput, normalizePhoneForSubmit
    ghl.ts                     GHL webhooks, events, consent copy, normalizers
    data/
      candidate.ts             Alex Morgan biography + key facts
      california.ts            CA counties & regions (volunteer form)
      events.ts                Static fallback events
      navigation.ts            Nav/footer link maps
      testimonials.ts          Testimonials copy
      policies.ts              (legacy — intentionally unused)
      news.ts                  (legacy — intentionally unused)
public/
  placeholder-event.svg        Fallback event image
```

## Design System

The project follows strict editorial rules — numbered section meta (`01 ── Section name`), italic red accent on a single word in every headline, hairline borders instead of shadowed cards, and Source Serif 4 never going above `font-normal`. Full rules in:

- `.claude/rules/design-tokens.md` — colors, fonts, type scale, spacing
- `.claude/rules/components.md` — shared components and composition
- `.claude/rules/animations.md` — GSAP patterns (reveal, bar draw, label swap)
- `.claude/rules/pages.md` — page structure (PageHero + numbered sections)
- `.claude/rules/forms.md` — form primitives and submission flow
- `.claude/rules/forms-compliance-pattern.md` — phone + consent + compliance webhook
- `.claude/rules/ghl-forms-webhooks.md` — form payload shapes and webhook UUIDs
- `.claude/rules/ghl-events-integration.md` — custom-object schema and normalization

Brand palette (`tailwind.config.ts` → `theme.extend.colors.brand`):

| Token | Hex | Use |
| --- | --- | --- |
| `brand.navy` | `#0A1F44` | Foreground / dark backgrounds |
| `brand.red` | `#C8102E` | Single accent color — italic word, indexes, hover bars |
| `brand.cream` | `#F4F1EA` | Section backgrounds |
| `brand.gold` | `#C9A227` | Reserved |

## Customizing

- **Candidate content** → `src/lib/data/candidate.ts`
- **CA counties / regions** → `src/lib/data/california.ts`
- **Endorsements, testimonials, nav** → `src/lib/data/*.ts`
- **Brand colors / CSS variables** → `tailwind.config.ts` and `src/app/globals.css`
- **Webhook URLs / GHL config** → `src/lib/ghl.ts` and `.env.local`
