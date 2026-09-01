# Security

## Status

Phase 1 implemented: Supabase email/password auth, RLS on the `orders` table, an admin allowlist, and server-side price/authority validation. Stripe webhook verification and a real roles table are not built yet (see below).

## Requirements

- Authentication via Supabase Auth (email/password in Phase 1; `middleware.ts` refreshes the session on every request per the standard `@supabase/ssr` pattern).
- Authorization: currently two tiers — any authenticated user (own orders only, enforced by RLS `auth.uid() = user_id`) and admin (checked server-side against the `ADMIN_EMAILS` env var allowlist in `src/lib/auth/is-admin.ts`, not yet a database-backed roles table — see DATABASE.md). Row-level security is enabled on `orders`; no `update`/`delete` policy exists for the `authenticated` role, so order status transitions can only happen through the service-role admin client from trusted server code (`checkout/actions.ts`, `admin/actions.ts`).
- Input validation on every server action boundary via `zod` (`src/app/checkout/actions.ts`, `src/lib/auth/actions.ts`, `src/app/admin/actions.ts`) — form data is never trusted as-is.
- Prices are never trusted from the client: checkout re-derives every line item price from the server-side catalog (`src/lib/catalog/products.ts`) before creating an order.
- Rate limiting on public API routes and auth endpoints — not yet implemented; needed before this goes beyond local/internal testing.
- CSRF protection: Next.js server actions have this built in (same-origin check on the action's internal fetch).
- Secrets management: all secrets in environment variables, never in source. `.env*` files gitignored from the start (`.env.example` is the tracked exception, and it never carries real values).
- Stripe webhook signature verification: not applicable yet — Phase 1 checkout is a simulated payment, no real Stripe integration exists.
- Audit logs for admin actions and automated agent actions (see ARCHITECTURE.md `agent_actions`) — the `orders.status_history` column covers order-status audit trail for now; a general `agent_actions` table is Phase 7+ work.
- Database access controls: the service-role (`SUPABASE_SERVICE_ROLE_KEY`) client is only ever instantiated in server-only code (`src/lib/supabase/admin.ts`, guarded by the `server-only` package) and only used after an admin-allowlist check.

## Never Commit

- `.env` files
- API keys
- Stripe secret keys
- Database passwords
- Supplier credentials
- Customer private information

## Review Cadence

Every major feature should get a security pass (auth flaws, injection, XSS, CSRF, secrets exposure, webhook vulnerabilities, API abuse, rate-limit issues, DB permissions) before being considered done, per CLAUDE.md's Definition of Done.
