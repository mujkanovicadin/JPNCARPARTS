# Database

## Status

Phase 1 and Phase 2 are both live: `orders` (Phase 1) and the normalized product/vehicle/compatibility catalog (`brands`, `categories`, `suppliers`, `products`, `part_numbers`, `vehicles`, `compatibility` — Phase 2) all exist as real tables. The catalog is seeded with real researched data (see `src/lib/catalog/seed-data.ts`), not further mock data — every product's part number and specs came from an official brand page or an authorized distributor listing, with the source URL and a `verification_status` recorded per compatibility claim.

## Engine

PostgreSQL via Supabase. Schema should stay portable enough to migrate off Supabase if ever needed (avoid Supabase-proprietary features where a plain Postgres equivalent exists).

## Current Tables

### orders (Phase 1)

Defined in `supabase/migrations/0001_orders.sql`. A deliberate Phase-1 simplification: items are stored as a `jsonb` snapshot on the row instead of a normalized `order_items` table (see Technical Debt in `PROJECT_ROADMAP.md` — this is the natural next thing to normalize now that `products` is a real table).

- `id`, `user_id` (FK → `auth.users`)
- `status` (constrained to the CLAUDE.md section 17 lifecycle values)
- `currency`, `items` (jsonb: productId/slug/name/unitPriceMinorUnits/quantity), `subtotal`, `shipping_cost`, `total` (all integer minor units)
- `shipping_address` (jsonb)
- `status_history` (jsonb array, appended on every transition — never overwritten, per the "every transition must be logged" rule)
- `created_at`, `updated_at`

RLS: authenticated users can `select`/`insert` only their own rows (`auth.uid() = user_id`). No `update`/`delete` policy for the `authenticated` role — status changes go through the service-role admin client from trusted server code only (`src/app/checkout/actions.ts`, `src/app/admin/actions.ts`), gated by the `ADMIN_EMAILS` allowlist (`src/lib/auth/is-admin.ts`).

There is no `profiles`/roles table yet — admin access is a Phase-1 simplification via the `ADMIN_EMAILS` env var.

### Catalog tables (Phase 2)

Defined in `supabase/migrations/0002_catalog.sql`. All public-read (`select` allowed for everyone — this is catalog data, not user data); no `insert`/`update`/`delete` for `anon`/`authenticated`. Writes go through the service-role admin client only, currently via `scripts/seed-catalog.ts` (run with `npm run db:seed`).

- **brands**: id, name, slug, website.
- **categories**: id, slug, name, description.
- **suppliers**: id, name, website, notes. Created empty — no real supplier relationship exists yet (open business question, Phase 3 territory).
- **products**: id, slug, canonical_name, brand_id → brands, manufacturer, category_id → categories, supplier_id → suppliers (nullable), description, specifications (jsonb), images (text[]), price_minor_units (**nullable** — see below), currency, availability, source_url, weight, dimensions, country_of_origin, warranty, created_at, updated_at.
- **part_numbers**: id, product_id → products, number, number_type (oem/manufacturer/supplier_sku/alternate/cross_reference), previous_number, replacement_number, notes.
- **vehicles**: id, make, model, generation, trim, year_start, year_end, engine, engine_code, transmission, drivetrain, market, chassis_code.
- **compatibility**: id, product_id → products, vehicle_id → vehicles, compatibility_type, source, confidence, notes, verification_status (VERIFIED | SUPPLIER_CONFIRMED | INFERRED | UNKNOWN | NOT_COMPATIBLE).

**`products.price_minor_units` is nullable.** CLAUDE.md section 37 prohibits inventing prices — several real products in the seed data have no verifiable price from any source, and rather than fabricate one, those rows store `null` and the UI shows "Price on request." Checkout defensively rejects any cart item whose product has a null price server-side, even though the UI doesn't offer an "Add to cart" affordance for those products in the first place.

**`compatibility.verification_status` is set per-row based on where the fitment claim actually came from** — `SUPPLIER_CONFIRMED` only when found directly on the brand's own page, `INFERRED` when only a retailer/distributor listing confirmed it. `source` holds that URL. This is enforced by convention in `seed-data.ts`, not a database constraint — a future admin catalog UI (Phase 7+) should keep that discipline.

### Retired: static TypeScript catalog

`src/lib/catalog/products.ts` and `categories.ts` (the Phase 1 mock arrays) are deleted. The app reads the catalog via `src/lib/catalog/queries.ts` (Supabase queries) instead. `src/lib/catalog/seed-data.ts` still exists as TypeScript, but only as the input to `scripts/seed-catalog.ts` — the app itself never imports it.

## Rules

- Every schema change goes through a migration file, never manual production edits.
- `created_at` / `updated_at` on all mutable tables.
- Indexes added based on observed query patterns, not speculatively.
- Financial columns use integer minor units (e.g. cents) or a decimal type — never floating point. Never fabricated when unknown — stored as `null` instead (see `products.price_minor_units` above).
