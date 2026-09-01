"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 font-mono text-xs tracking-wide uppercase transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {active ? (
        <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
      ) : null}
    </Link>
  );
}

export function SiteHeader({ userEmail }: { userEmail: string | null }) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
      <div className="h-px bg-gradient-to-r from-primary/60 via-primary/10 to-transparent" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-base font-semibold tracking-tight">JPN Car Parts</span>
          <span className="hidden font-mono text-[0.65rem] tracking-widest text-muted-foreground sm:inline">
            日本 · JDM SUPPLY
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <NavLink href="/parts">Parts</NavLink>
          <NavLink href="/cart">Cart{itemCount > 0 ? ` (${itemCount})` : ""}</NavLink>
          {userEmail ? (
            <>
              <NavLink href="/orders">Orders</NavLink>
              <NavLink href="/account">Account</NavLink>
            </>
          ) : (
            <Link
              href="/login"
              className="ml-2 rounded-sm border border-border px-3 py-1.5 font-mono text-xs tracking-wide uppercase text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
