# Project Roadmap

## Current Phase

**Phase 3: Supplier System** — not yet started. Phase 2 is complete and verified end-to-end against the live database.

## Completed Milestones

**Phase 0: Foundation**
- Repository initialized, pushed to `github.com/mujkanovicadin/JPNCARPARTS`. CLAUDE.md and core docs created.
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui scaffold.
- Supabase client wiring: browser client, server client, server-only admin client, all reading from validated env vars (`src/lib/env.ts`). Connected to a real Supabase project.
- Structured JSON logger, global error boundary, CI workflow (lint/typecheck/test/build), Vitest + Playwright configured.

**Phase 1: E-Commerce MVP — DONE**
- Storefront, cart, Supabase email/password auth, `orders` table + RLS, checkout with server-side re-pricing (simulated payment, no real Stripe yet), order history, `ADMIN_EMAILS`-gated admin dashboard.
- Visual design: committed the storefront to a single dark, Japanese-industrial theme (warm graphite background, one vermillion accent, Geist Sans/Mono with tabular figures, technical/datasheet visual language) per CLAUDE.md section 24. Added `motion` (motion.dev) for micro-motion, a branded favicon, a footer, shared `ProductCard`/`StatusTag` components.
- **Verified end-to-end against the live Supabase project** (2026-09-01): full path walked in a real browser — sign in → browse → add to cart → checkout → order confirmation → orders list → admin dashboard → status change. Confirmed `status_history` logs every transition.
- Two real bugs found and fixed during verification: a circular `--font-sans` CSS variable silently falling back to serif everywhere, and a cart-persistence race condition that wiped a saved cart on full page navigation (regression test added: `src/lib/cart/cart-provider.test.tsx`).

**Phase 2: Product Database — DONE**
- Real normalized schema (`supabase/migrations/0002_catalog.sql`): `brands`, `categories`, `suppliers` (empty), `products`, `part_numbers`, `vehicles`, `compatibility`. Public-read RLS, writes via service-role only.
- Seeded with **real researched data**, not further mock data (`src/lib/catalog/seed-data.ts`, `scripts/seed-catalog.ts`, run via `npm run db:seed`): 15 products across 5 categories from 12 real brands, researched from official manufacturer sites and authorized distributor listings. Every product carries its real part number; every compatibility claim carries a `source` URL and an honest `verification_status` (`SUPPLIER_CONFIRMED` when found directly on the brand's own page, `INFERRED` when only a retailer confirmed it).
- `products.price_minor_units` is **nullable** — 6 of 15 real products had no verifiable price anywhere, and per CLAUDE.md section 37 (never invent prices) those show "Price on request" in the UI instead of a fabricated number. Checkout defensively rejects any cart item whose product has a null price.
- Retired the static TypeScript catalog (`src/lib/catalog/products.ts`, `categories.ts`) in favor of `src/lib/catalog/queries.ts` (Supabase-backed data access) used by the home, catalog, and product-detail pages, plus checkout's authoritative pricing lookup.
- Fixed a real UX bug found during verification: a "flash of empty cart" on every fresh page load of `/cart` and `/checkout`, before the `localStorage` hydration effect completes. `CartProvider` now exposes `isHydrated`, and both pages render a neutral blank state instead of a wrong "cart is empty" until hydration finishes.
- **Verified end-to-end against the live Supabase project** (2026-09-01): home/catalog/product pages render real data, search and category filters query the DB, a `SUPPLIER_CONFIRMED` and an `INFERRED` compatibility entry both render correctly with their real source notes, a "price on request" product correctly hides the Add to Cart affordance, and a full checkout with a real DB-priced item ($600 GReddy oil cooler + $49 shipping = $649) completed correctly end to end.

## Current Milestone

Not yet scoped. Phase 3 (Supplier System) is next per the roadmap, but its shape depends on the still-open sourcing-strategy question below — worth resolving that before building supplier import/sync tooling around a channel that might not be the one used.

## Upcoming Milestones

- Phase 3: Supplier system (manual import first, then automation) — blocked on the sourcing-strategy business question below
- Phase 4: Data collection / crawling infrastructure — **sourcing-channel research done for two candidate marketplaces (see Business Questions/Known Problems); no scraper will be built against either without a resolved legal path**
- Phase 5: Vehicle compatibility engine (the Phase 2 schema already supports this; this phase is the UI/UX around vehicle selection and filtered results)
- Phase 6: International commerce (currency, shipping, tax/duty) — real Stripe integration likely lands here or earlier once test keys are available
- Phase 7: Automation agents
- Phase 8: Japanese Parts AI Copilot
- Phase 9: Global scale
- Phase 10: Proprietary data platform

## Known Problems

- **Sourcing via direct scraping is not viable for at least one candidate marketplace.** Researched 2026-09-01: Mercari Japan's ToS (§4.3, Prohibited Conduct policy) explicitly bars commercial resale use of their platform/data — this isn't a gray area, it directly describes this business's model. Yahoo Auctions Japan is murkier (no explicit anti-scraping clause found in the public Auctions Guidelines, but falls under LINE Yahoo's broader ToS restricting automated collection; their public Auctions API (YJDN) appears largely closed to new commercial registrations, unconfirmed). Established proxy/import services (Buyee, ZenMarket) hold official partnerships with both platforms and are the conventional legitimate route.
- Some seed product data has weaker sourcing confidence and should be re-verified before being treated as fully authoritative: the Endless brake kit's part number (`1933420-370`) couldn't be confirmed on Endless's own domain (site blocked automated access during research), and a few products' prices are retailer-observed ranges rather than brand MSRP (noted per-product in `seed-data.ts`).

## Technical Debt

- `orders.items` is a jsonb snapshot rather than a normalized `order_items` table referencing `products` — now that `products` is a real table (Phase 2), this is the natural next normalization, likely alongside Phase 3.
- No `profiles`/roles table — admin access is an `ADMIN_EMAILS` env var allowlist. Fine for one or two admins; needs a real roles table before more are added.
- No rate limiting on auth endpoints or server actions yet.
- Checkout simulates payment; no real Stripe integration, so no webhook handling exists yet.
- `suppliers` table exists but is empty — no real supplier relationship yet (see Business Questions).

## Business Questions (open, require human input)

- **Sourcing strategy**: pursue a Buyee/ZenMarket-style proxy partnership, seek direct Yahoo Auctions API access, or find other Japanese suppliers/wholesalers with cleaner commercial terms? This blocks meaningful Phase 3 (Supplier System) work — direct scraping of Mercari Japan is off the table on ToS grounds, and Yahoo Auctions needs further legal verification before any automated access.
- Preferred deployment target (Vercel assumed given Next.js, but not confirmed)?
- Initial brand/company name and domain?
- Stripe account setup — new or existing, and when to wire in real payments?
- Whether to re-enable Supabase's email-confirmation requirement before any real users sign up (currently disabled for local testing).
- Real pricing/inventory data (currently 6 of 15 seed products show "Price on request" — needs either a supplier relationship or direct manufacturer pricing to resolve).

## Decisions Requiring Human Approval

- Any spend (hosting, domain, Supabase/Stripe paid tiers, APIs).
- Any supplier or marketplace integration before ToS/legal review.
- Business model or pricing strategy changes.
- Production deployments and destructive database migrations.
