# Morgan for Senate — project rules

Political campaign website (Next.js 15, App Router, Tailwind, GSAP). Editorial/typographic design language, not a SaaS template.

## Read before editing

- **`.claude/rules/design-tokens.md`** — colors, fonts, type scale, spacing
- **`.claude/rules/components.md`** — shared components and how to compose them
- **`.claude/rules/animations.md`** — GSAP patterns (reveal, hover, bar draw, label swap)
- **`.claude/rules/pages.md`** — page structure (PageHero + numbered section convention)
- **`.claude/rules/forms.md`** — form primitives, Radix Select, submission flow

## Pages that exist

Home · About · Events · Events/[id] · Volunteer · Ask · Donate · Contact · Privacy · Terms · Thank-you · Not-found (404).

Do **not** add Policies, News, or Get-Involved pages — they were intentionally removed. Donate + Volunteer + Ask + Events split those paths.

## Forms in use

Volunteer, Contact, Ask, RSVP (on event detail), Donate, Newsletter (footer). All four primary forms redirect to `/thank-you` on submit via `useRouter().push`.

## Hard design rules

1. **Editorial voice.** Every section sidebar uses a numbered small-caps meta (`01 ── Section name`). Italic red accent on one word in every headline (`em.italic.text-brand-red`). No colored card tiles, no gradient-everywhere SaaS look.
2. **Two-column section grid.** `grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-20` — sidebar meta + main content. Applies to every section.
3. **Font weights never go above `font-normal`** for display serif. Italic is the accent, not bold.
4. **Red accent used sparingly.** One `text-brand-red` italic word per headline, plus indexes, plus hover bars. Not on every element.
5. **Clamp for display type.** `style={{ fontSize: "clamp(min, vw, max)" }}` on huge headings, never plain tailwind sizes.
6. **Never import lucide icons inside a server component that passes them as props** — do the icon lookup inside a `"use client"` component. (See FooterLink for the pattern.)

## Stop-the-line warnings

- If you're about to add `bg-gradient-to-*` with multiple color stops — stop and use a solid or hairline rule instead.
- If you're about to add `shadow-xl rounded-2xl bg-white` to make something look like a card — stop and use hairline borders + spacing instead.
- If you're about to pass a `LucideIcon` across the server/client boundary — stop and do the lookup inside the client component.
- If you're changing `transformOrigin` mid-tween on the same element — stop. Set origin once via `gsap.set`, add `overwrite: "auto"` to tweens.

## Tech stack

Next 15.5 · React 19 · Tailwind 3 · GSAP 3 + `@gsap/react` · Radix UI · shadcn-style UI primitives · Inter + Source Serif 4.
