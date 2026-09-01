# Japanese Automotive Parts Platform

Phase 0 foundation skeleton. See [CLAUDE.md](./CLAUDE.md) for the full project
brief, [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) for current status, and
[ARCHITECTURE.md](./ARCHITECTURE.md) / [DATABASE.md](./DATABASE.md) /
[SECURITY.md](./SECURITY.md) for the supporting docs.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui, Supabase
(Postgres, Auth, Storage), Stripe (added later), Vitest + Testing Library for
unit tests, Playwright for e2e.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real Supabase values
npm run dev
```

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
