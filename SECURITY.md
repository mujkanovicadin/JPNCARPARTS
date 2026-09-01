# Security

## Status

No code exists yet. This document captures baseline security requirements from CLAUDE.md to be implemented starting in Phase 0/1.

## Requirements

- Authentication via Supabase Auth.
- Authorization: role separation between customer, admin, and internal service roles. Row-level security (RLS) enabled on all Supabase tables holding customer or order data.
- Input validation on every external boundary (forms, API routes, webhooks) — never trust client input.
- Rate limiting on public API routes and auth endpoints.
- CSRF protection where applicable (Next.js server actions / API routes handling state changes).
- Secrets management: all secrets in environment variables, never in source. `.env*` files gitignored from the start.
- Stripe webhook signature verification required on every webhook handler.
- Audit logs for admin actions and automated agent actions (see ARCHITECTURE.md `agent_actions`).
- Database access controls: least-privilege service roles, RLS policies reviewed per table.

## Never Commit

- `.env` files
- API keys
- Stripe secret keys
- Database passwords
- Supplier credentials
- Customer private information

## Review Cadence

Every major feature should get a security pass (auth flaws, injection, XSS, CSRF, secrets exposure, webhook vulnerabilities, API abuse, rate-limit issues, DB permissions) before being considered done, per CLAUDE.md's Definition of Done.
