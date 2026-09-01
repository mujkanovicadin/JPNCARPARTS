# Project Roadmap

## Current Phase

**Phase 1: E-Commerce MVP** — core implementation complete; two manual Supabase dashboard steps remain before it's fully working end-to-end (see Current Milestone).

## Completed Milestones

**Phase 0: Foundation**
- Repository initialized, pushed to `github.com/mujkanovicadin/JPNCARPARTS`. CLAUDE.md and core docs created.
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui scaffold.
- Supabase client wiring: browser client, server client, server-only admin client, all reading from validated env vars (`src/lib/env.ts`). Connected to a real Supabase project.
- Structured JSON logger, global error boundary, CI workflow (lint/typecheck/test/build), Vitest + Playwright configured.

**Phase 1: E-Commerce MVP**
- Mock product catalog (`src/lib/catalog/`): 16 seed products across 5 categories, integer-minor-unit pricing, `formatMoney` helper.
- Storefront: home page, `/parts` catalog with category filter + text search, `/parts/[slug]` product detail pages (with a compatibility disclaimer since fitment is inferred, not verified — per CLAUDE.md section 10).
- Cart: client-side context + `localStorage` persistence (`src/lib/cart/`), `/cart` page.
- Auth: Supabase email/password, `middleware.ts` session refresh, `/login`, `/signup`, `/account`.
- Orders: `orders` table + RLS (`supabase/migrations/0001_orders.sql`), `/checkout` (server-side re-pricing, never trusts client-submitted prices; simulated payment step — no real Stripe yet), `/orders` list and `/orders/[id]` detail.
- Admin: `/admin` gated by an `ADMIN_EMAILS` allowlist, order list with a status-change control writing to `status_history`.
- Tests: unit tests for `formatMoney` and the cart reducer; Playwright golden-path e2e (browse → product → add to cart → view cart).
- Verified locally: lint, typecheck, unit tests, e2e tests, and production build all pass. Manually smoke-tested the storefront and sign-up flow in a real browser.

## Current Milestone

Two manual one-time steps in the Supabase dashboard are needed before checkout/orders/admin can be exercised end-to-end (can't be scripted — project API keys don't allow arbitrary DDL or auth-setting changes):

1. **Run `supabase/migrations/0001_orders.sql`** in the SQL Editor to create the `orders` table.
2. **Email confirmation**: sign-up currently doesn't produce a usable session because Supabase's default "Confirm email" setting blocks it until the confirmation link is clicked. For local/test use, disable it under Authentication → Sign In / Providers → Email, or confirm the test account via the emailed link.

Once those are done: manually walk the full path (sign up → browse → add to cart → checkout → view order → sign in as an `ADMIN_EMAILS` address → change its status in `/admin`) to confirm everything works against the real database, then mark Phase 1 fully done.

## Upcoming Milestones

- Phase 2: Product database (normalized product/vehicle/compatibility schema + seed data) — replaces the current mock TypeScript catalog
- Phase 3: Supplier system (manual import first, then automation)
- Phase 4: Data collection / crawling infrastructure
- Phase 5: Vehicle compatibility engine
- Phase 6: International commerce (currency, shipping, tax/duty) — real Stripe integration likely lands here or earlier once test keys are available
- Phase 7: Automation agents
- Phase 8: Japanese Parts AI Copilot
- Phase 9: Global scale
- Phase 10: Proprietary data platform

## Known Problems

- Sign-up doesn't produce a usable session until email confirmation is handled (see Current Milestone above) — not a code bug, a Supabase project setting.

## Technical Debt

- `orders.items` is a jsonb snapshot rather than a normalized `order_items` table — deliberate for Phase 1 since products aren't database-backed yet; revisit when Phase 2 introduces a real `products` table.
- No `profiles`/roles table — admin access is an `ADMIN_EMAILS` env var allowlist. Fine for one or two admins; needs a real roles table before more are added.
- No rate limiting on auth endpoints or server actions yet.
- Checkout simulates payment; no real Stripe integration, so no webhook handling exists yet.

## Business Questions (open, require human input)

- Preferred deployment target (Vercel assumed given Next.js, but not confirmed)?
- Initial brand/company name and domain?
- Which initial supplier(s) or marketplace(s) will be used for early manual product sourcing, and have their terms of service been reviewed?
- Stripe account setup — new or existing, and when to wire in real payments?
- Keep Supabase's default email-confirmation requirement, or disable it for now?

## Decisions Requiring Human Approval

- Any spend (hosting, domain, Supabase/Stripe paid tiers, APIs).
- Any supplier or marketplace integration before ToS/legal review.
- Business model or pricing strategy changes.
- Production deployments and destructive database migrations.
