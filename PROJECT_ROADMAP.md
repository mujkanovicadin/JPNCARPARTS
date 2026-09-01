# Project Roadmap

## Current Phase

**Phase 2: Product Database** — not yet started. Phase 1 is complete and verified end-to-end against the live database.

## Completed Milestones

**Phase 0: Foundation**
- Repository initialized, pushed to `github.com/mujkanovicadin/JPNCARPARTS`. CLAUDE.md and core docs created.
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui scaffold.
- Supabase client wiring: browser client, server client, server-only admin client, all reading from validated env vars (`src/lib/env.ts`). Connected to a real Supabase project.
- Structured JSON logger, global error boundary, CI workflow (lint/typecheck/test/build), Vitest + Playwright configured.

**Phase 1: E-Commerce MVP — DONE**
- Mock product catalog (`src/lib/catalog/`): 16 seed products across 5 categories, integer-minor-unit pricing, `formatMoney` helper.
- Storefront: home page, `/parts` catalog with category filter + text search, `/parts/[slug]` product detail pages (with a compatibility disclaimer since fitment is inferred, not verified — per CLAUDE.md section 10).
- Cart: client-side context + `localStorage` persistence (`src/lib/cart/`), `/cart` page.
- Auth: Supabase email/password, `middleware.ts` session refresh, `/login`, `/signup`, `/account`.
- Orders: `orders` table + RLS (`supabase/migrations/0001_orders.sql`), `/checkout` (server-side re-pricing, never trusts client-submitted prices; simulated payment step — no real Stripe yet), `/orders` list and `/orders/[id]` detail.
- Admin: `/admin` gated by an `ADMIN_EMAILS` allowlist, order list with a status-change control writing to `status_history`.
- Tests: unit tests for `formatMoney` and the cart reducer; Playwright golden-path e2e (browse → product → add to cart → view cart).
- Visual design: committed the storefront to a single dark, Japanese-industrial theme (warm graphite background, one vermillion accent, Geist Sans/Mono with tabular figures, technical/datasheet visual language) per CLAUDE.md section 24. Added `motion` (motion.dev) for entry/hover/press micro-motion, a branded favicon, a footer, and shared `ProductCard`/`StatusTag` components.
- **Verified end-to-end against the live Supabase project** (2026-09-01): migration applied, email confirmation disabled for testing, full path walked in a real browser — sign in → browse → add to cart → checkout (server-priced: $1,199 + $49 shipping = $1,248) → order confirmation → orders list → admin dashboard → status change (PAID → SHIPPED). Confirmed `status_history` logs every transition with actor and timestamp.
- Two real bugs found and fixed during this verification pass: a circular `--font-sans` CSS variable silently falling back to serif everywhere, and a cart-persistence race condition that wiped a saved cart on full page navigation (now covered by a regression test, `src/lib/cart/cart-provider.test.tsx`).

## Current Milestone

Start Phase 2: Product Database. Per CLAUDE.md sections 9–12, build:

- `products`, `part_numbers` (with supersession/cross-reference chains), `vehicles`, `compatibility` tables — replacing the current static `src/lib/catalog/` TypeScript data.
- Compatibility rows carry `verification_status` (VERIFIED / SUPPLIER_CONFIRMED / INFERRED / UNKNOWN / NOT_COMPATIBLE) — never silently upgraded.
- Seed data derived from the existing 16 mock products so the storefront keeps working through the migration.
- This is the natural point to fold `order.items` into a real `order_items` table referencing `products` (tracked as technical debt below).

## Upcoming Milestones

- Phase 3: Supplier system (manual import first, then automation)
- Phase 4: Data collection / crawling infrastructure — **sourcing-channel research done for two candidate marketplaces (see Business Questions/Known Problems); no scraper will be built against either without a resolved legal path**
- Phase 5: Vehicle compatibility engine
- Phase 6: International commerce (currency, shipping, tax/duty) — real Stripe integration likely lands here or earlier once test keys are available
- Phase 7: Automation agents
- Phase 8: Japanese Parts AI Copilot
- Phase 9: Global scale
- Phase 10: Proprietary data platform

## Known Problems

- **Sourcing via direct scraping is not viable for at least one candidate marketplace.** Researched 2026-09-01: Mercari Japan's ToS (§4.3, Prohibited Conduct policy) explicitly bars commercial resale use of their platform/data — this isn't a gray area, it directly describes this business's model. Yahoo Auctions Japan is murkier (no explicit anti-scraping clause found in the public Auctions Guidelines, but falls under LINE Yahoo's broader ToS restricting automated collection; their public Auctions API (YJDN) appears largely closed to new commercial registrations, unconfirmed). Established proxy/import services (Buyee, ZenMarket) hold official partnerships with both platforms and are the conventional legitimate route — worth pursuing as a partnership/API relationship instead of building a scraper. This needs a business decision, not more code.

## Technical Debt

- `orders.items` is a jsonb snapshot rather than a normalized `order_items` table — deliberate for Phase 1 since products aren't database-backed yet; revisit now that Phase 2 introduces a real `products` table.
- No `profiles`/roles table — admin access is an `ADMIN_EMAILS` env var allowlist. Fine for one or two admins; needs a real roles table before more are added.
- No rate limiting on auth endpoints or server actions yet.
- Checkout simulates payment; no real Stripe integration, so no webhook handling exists yet.

## Business Questions (open, require human input)

- Preferred deployment target (Vercel assumed given Next.js, but not confirmed)?
- Initial brand/company name and domain?
- **Sourcing strategy**: pursue a Buyee/ZenMarket-style proxy partnership, seek direct Yahoo Auctions API access, or find other Japanese suppliers/wholesalers with cleaner commercial terms? (See Known Problems — direct scraping of Mercari Japan is off the table on ToS grounds; Yahoo Auctions needs further legal verification before any automated access.)
- Stripe account setup — new or existing, and when to wire in real payments?
- Whether to re-enable Supabase's email-confirmation requirement before any real users sign up (currently disabled for local testing).

## Decisions Requiring Human Approval

- Any spend (hosting, domain, Supabase/Stripe paid tiers, APIs).
- Any supplier or marketplace integration before ToS/legal review.
- Business model or pricing strategy changes.
- Production deployments and destructive database migrations.
