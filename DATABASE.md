# Database

## Status

No schema exists yet. This document captures the planned data model per CLAUDE.md; actual migrations will supersede it as Phase 2 begins.

## Engine

PostgreSQL via Supabase. Schema should stay portable enough to migrate off Supabase if ever needed (avoid Supabase-proprietary features where a plain Postgres equivalent exists).

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
