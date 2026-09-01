# Project Roadmap

## Current Phase

**Phase 0: Foundation** — core scaffold in place; deployment and a real Supabase project are still pending.

## Completed Milestones

- Repository initialized, CLAUDE.md and core docs (this file, ARCHITECTURE, DATABASE, SECURITY) created.
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui scaffold.
- Supabase client wiring: browser client, server client (`@supabase/ssr`), and a server-only admin client — all reading from validated env vars (`src/lib/env.ts`), no real project connected yet.
- `.env.example` documenting required vars; `.env*` gitignored.
- Structured JSON logger (`src/lib/logger.ts`); global `error.tsx` boundary wired to it; `not-found.tsx`.
- Testing: Vitest + Testing Library configured with a passing sample unit test; Playwright configured with a sample e2e spec (browsers not yet installed locally — run `npx playwright install` before `npm run test:e2e`).
- CI workflow (`.github/workflows/ci.yml`): lint, typecheck, unit tests, build on push/PR to `main` (uses placeholder Supabase env vars for the build step since no real project exists yet).
- Verified locally: lint, typecheck, unit tests, and production build all pass.

## Current Milestone

Finish Phase 0:

- Create/connect a real Supabase project (needs the user — see Business Questions below) and swap placeholder env vars for real ones.
- Decide on and set up a deployment target (Vercel assumed, not confirmed).
- Push repository to a remote (GitHub assumed, not yet created).
- Decide whether to install Playwright browsers now or defer until e2e tests actually matter.

## Upcoming Milestones

- Phase 1: E-commerce MVP (storefront with mocked products, cart, checkout, basic admin)
- Phase 2: Product database (normalized product/vehicle/compatibility schema + seed data)
- Phase 3: Supplier system (manual import first, then automation)
- Phase 4: Data collection / crawling infrastructure
- Phase 5: Vehicle compatibility engine
- Phase 6: International commerce (currency, shipping, tax/duty)
- Phase 7: Automation agents
- Phase 8: Japanese Parts AI Copilot
- Phase 9: Global scale
- Phase 10: Proprietary data platform

## Known Problems

None yet — project has not started.

## Technical Debt

None yet.

## Business Questions (open, require human input)

- Which Supabase account/org and region to use?
- Preferred deployment target (Vercel assumed given Next.js, but not confirmed)?
- Initial brand/company name and domain?
- Which initial supplier(s) or marketplace(s) will be used for early manual product sourcing, and have their terms of service been reviewed?
- Stripe account setup — new or existing?

## Decisions Requiring Human Approval

- Any spend (hosting, domain, Supabase/Stripe paid tiers, APIs).
- Any supplier or marketplace integration before ToS/legal review.
- Business model or pricing strategy changes.
- Production deployments and destructive database migrations.
