-- Phase 1 orders table. Items are stored as a jsonb snapshot rather than a
-- normalized order_items table because the product catalog is still mock
-- data (Phase 2 introduces a real products table and order_items will move
-- to a proper foreign-keyed table then).
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'PENDING_PAYMENT' check (
    status in (
      'PENDING_PAYMENT',
      'PAID',
      'SUPPLIER_PURCHASE_PENDING',
      'SUPPLIER_ORDERED',
      'SUPPLIER_CONFIRMED',
      'INBOUND',
      'READY_TO_SHIP',
      'SHIPPED',
      'DELIVERED',
      'SUPPLIER_OUT_OF_STOCK',
      'SUPPLIER_CANCELLED',
      'CUSTOMER_CANCELLED',
      'REFUND_PENDING',
      'REFUNDED'
    )
  ),
  currency text not null,
  items jsonb not null,
  subtotal integer not null,
  shipping_cost integer not null,
  total integer not null,
  shipping_address jsonb not null,
  status_history jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- No update/delete policy for the authenticated role: status changes and
-- corrections go through the service-role admin client from trusted server
-- code only (see src/lib/auth/is-admin.ts).
