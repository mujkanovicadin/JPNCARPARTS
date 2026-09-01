# Architecture

## Status

No code exists yet. This document describes the intended Phase 0 architecture per CLAUDE.md and will be updated as the system is actually built.

## Overall Shape

A modular monolith, not microservices. Split into services only when there's a demonstrated reason (traffic, team boundaries, deployment cadence), not preemptively.

## Stack

- **Frontend**: Next.js (App Router), TypeScript, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes / server actions initially; a separate service (likely FastAPI/Python) only if AI/scraping workloads justify it later
- **Database**: PostgreSQL via Supabase (Auth, Storage, DB tooling included)
- **Payments**: Stripe (never store raw card data)
- **Search**: Postgres full-text/fuzzy search initially; dedicated search engine (Meilisearch/Typesense/OpenSearch) only if/when needed

## Module Boundaries (planned, to refine during Phase 1-2)

- `catalog` — products, brands, manufacturers, categories, part numbers
- `vehicles` — vehicle database, compatibility engine
- `suppliers` — supplier profiles, supplier product records, imports
- `orders` — order lifecycle, payments, fulfillment tracking
- `shipping` — shipping provider abstraction (rates, shipment creation, tracking)
- `pricing` — deterministic landed-cost calculation (cost + fees + shipping + tax/duty + margin)
- `ai` — AI-assisted (not AI-authoritative) features: discovery, normalization, compatibility assistance, support, copilot
- `admin` — internal dashboard for products/suppliers/orders/customers/AI oversight

## Cross-Cutting Rules

- AI never has final say on price, tax, shipping, inventory, payments, order status, refunds, or final compatibility verification — these stay deterministic.
- Every automated agent action is logged with agent, action, timestamp, input, output, source, confidence, result.
- Compatibility data always carries a status: VERIFIED, SUPPLIER_CONFIRMED, INFERRED, UNKNOWN, NOT_COMPATIBLE. Never silently upgrade INFERRED to VERIFIED.
- Money is never handled as floating point — integer minor units or a decimal library only.

## Deployment (planned)

Target: Vercel for the Next.js app, Supabase-hosted Postgres. To be confirmed with the user before any paid resources are provisioned.
