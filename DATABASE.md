# Database

## Status

Phase 1 has one real table (`orders`, see below). The full normalized product/vehicle/compatibility schema described under "Planned Core Tables (Phase 2)" does not exist yet — the current product catalog is static TypeScript data in `src/lib/catalog/`, not database-backed.

## Engine

PostgreSQL via Supabase. Schema should stay portable enough to migrate off Supabase if ever needed (avoid Supabase-proprietary features where a plain Postgres equivalent exists).

## Current Tables (Phase 1)

### orders

Defined in `supabase/migrations/0001_orders.sql`. A deliberate Phase-1 simplification: items are stored as a `jsonb` snapshot on the row instead of a normalized `order_items` table, because the product catalog itself isn't database-backed yet (Phase 2 introduces real products, and `order_items` becomes a proper foreign-keyed table then).

- `id`, `user_id` (FK → `auth.users`)
- `status` (constrained to the CLAUDE.md section 17 lifecycle values)
- `currency`, `items` (jsonb: productId/slug/name/unitPriceMinorUnits/quantity), `subtotal`, `shipping_cost`, `total` (all integer minor units)
- `shipping_address` (jsonb)
- `status_history` (jsonb array, appended on every transition — never overwritten, per the "every transition must be logged" rule)
- `created_at`, `updated_at`

RLS: authenticated users can `select`/`insert` only their own rows (`auth.uid() = user_id`). No `update`/`delete` policy exists for the `authenticated` role — status changes go through the service-role admin client from trusted server code only (`src/app/checkout/actions.ts` for the simulated-payment transition, `src/app/admin/actions.ts` for admin-driven transitions), gated by the `ADMIN_EMAILS` allowlist (`src/lib/auth/is-admin.ts`).

There is no `profiles`/roles table yet — admin access is a Phase-1 simplification via the `ADMIN_EMAILS` env var. A real roles table is natural Phase-2/7 work once there's more than one admin concern.

## Planned Core Tables (Phase 2)

### products

- id
- canonical_name
- manufacturer
- brand
- part_number
- category
- description
- specifications (jsonb)
- images
- price (integer minor units)
- currency
- availability
- supplier
- source_url
- source_product_id
- weight
- dimensions
- country_of_origin
- warranty
- created_at
- updated_at

### part_numbers

Tracks OEM numbers, manufacturer numbers, supplier SKUs, alternate/cross-reference numbers, and supersession chains (previous_number, replacement_number).

### vehicles

- make
- model
- generation
- trim
- year_start
- year_end
- engine
- engine_code
- transmission
- drivetrain
- market
- chassis_code

### compatibility

- product_id
- vehicle_id
- compatibility_type
- source
- confidence
- notes
- verification_status (VERIFIED | SUPPLIER_CONFIRMED | INFERRED | UNKNOWN | NOT_COMPATIBLE)

### suppliers

Profile, reliability score, status, ToS/legal review notes.

### orders

Order lifecycle per CLAUDE.md section 17 (PENDING_PAYMENT → ... → DELIVERED, plus exception states). Every status transition logged in an `order_status_history` table.

### agent_actions (audit log)

agent, action, timestamp, input, output, source, confidence, result — for every automated/AI action.

## Rules

- Every schema change goes through a migration file, never manual production edits.
- `created_at` / `updated_at` on all mutable tables.
- Indexes added based on observed query patterns, not speculatively.
- Financial columns use integer minor units (e.g. cents) or a decimal type — never floating point.
