-- Phase 2 catalog: replaces the static mock TypeScript catalog with a real
-- normalized product/vehicle/compatibility schema per CLAUDE.md sections 9-12.
-- All tables are public read (this is catalog data, not user data); writes
-- go through the service-role admin client only, never the anon/authenticated
-- roles directly - same pattern as `orders` in migration 0001.

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  website text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Empty for now: no real supplier relationship exists yet (Phase 3). This
-- just gives products.supplier_id somewhere to point once one does.
create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  canonical_name text not null,
  brand_id uuid not null references public.brands (id),
  manufacturer text not null,
  category_id uuid not null references public.categories (id),
  supplier_id uuid references public.suppliers (id),
  description text not null,
  specifications jsonb not null default '[]'::jsonb,
  images text[] not null default '{}',
  -- Nullable: some real products in the seed data have no verifiable price
  -- from any source. CLAUDE.md section 37 prohibits inventing prices, so
  -- those are stored as null and the UI shows "Price on request" rather
  -- than a fabricated number.
  price_minor_units integer,
  currency text not null default 'USD',
  availability text not null default 'made_to_order' check (
    availability in ('in_stock', 'made_to_order', 'backordered')
  ),
  source_url text,
  weight text,
  dimensions text,
  country_of_origin text,
  warranty text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_brand_id_idx on public.products (brand_id);
create index if not exists products_category_id_idx on public.products (category_id);

create table if not exists public.part_numbers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  number text not null,
  number_type text not null check (
    number_type in ('oem', 'manufacturer', 'supplier_sku', 'alternate', 'cross_reference')
  ),
  previous_number text,
  replacement_number text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists part_numbers_product_id_idx on public.part_numbers (product_id);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  generation text,
  trim text,
  year_start integer not null,
  year_end integer,
  engine text,
  engine_code text,
  transmission text,
  drivetrain text,
  market text,
  chassis_code text,
  created_at timestamptz not null default now()
);

create table if not exists public.compatibility (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  compatibility_type text not null default 'direct_fit',
  source text,
  confidence numeric,
  notes text,
  verification_status text not null check (
    verification_status in ('VERIFIED', 'SUPPLIER_CONFIRMED', 'INFERRED', 'UNKNOWN', 'NOT_COMPATIBLE')
  ),
  created_at timestamptz not null default now()
);

create index if not exists compatibility_product_id_idx on public.compatibility (product_id);
create index if not exists compatibility_vehicle_id_idx on public.compatibility (vehicle_id);

alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.suppliers enable row level security;
alter table public.products enable row level security;
alter table public.part_numbers enable row level security;
alter table public.vehicles enable row level security;
alter table public.compatibility enable row level security;

create policy "Public read access" on public.brands for select using (true);
create policy "Public read access" on public.categories for select using (true);
create policy "Public read access" on public.suppliers for select using (true);
create policy "Public read access" on public.products for select using (true);
create policy "Public read access" on public.part_numbers for select using (true);
create policy "Public read access" on public.vehicles for select using (true);
create policy "Public read access" on public.compatibility for select using (true);

-- No insert/update/delete policies for anon/authenticated: all writes go
-- through the service-role admin client (scripts/seed-catalog.ts, and later
-- the admin dashboard once Phase 2/7 add catalog management there).
