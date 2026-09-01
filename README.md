# Japanese Automotive Parts Platform

Phase 1 e-commerce MVP (mocked product catalog, real Supabase-backed accounts
and orders). See [CLAUDE.md](./CLAUDE.md) for the full project brief,
[PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for current status, and
[ARCHITECTURE.md](./ARCHITECTURE.md) / [DATABASE.md](./DATABASE.md) /
[SECURITY.md](./SECURITY.md) for the supporting docs.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui, Supabase
(Postgres, Auth), Stripe (added later — checkout currently simulates payment),
Vitest + Testing Library for unit tests, Playwright for e2e.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real Supabase values
npm run dev
```

Two one-time steps in your Supabase project before checkout/orders work end-to-end:

1. **Run the orders migration.** Paste the contents of
   `supabase/migrations/0001_orders.sql` into the Supabase dashboard's SQL
   Editor and run it once. (Project API keys can't run arbitrary DDL, so this
   can't be scripted from the app.)
2. **Email confirmation.** By default Supabase requires confirming a new
   account's email before it gets a session. For local/test use, either
   disable it (Authentication → Sign In / Providers → Email → turn off
   "Confirm email") or confirm each test account via the link Supabase emails.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build and serve
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit
- `npm run test` / `npm run test:watch` — unit tests (Vitest)
- `npm run test:e2e` — end-to-end tests (Playwright; run `npx playwright install` once first)

## Environment variables

See `.env.example`. Required for the app to build/run:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, never exposed to the client)
- `ADMIN_EMAILS` (comma-separated; these accounts can access `/admin`)
