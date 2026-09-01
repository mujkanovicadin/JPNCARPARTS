import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-wide uppercase">
          JPN Car Parts — Sourced in Japan, shipped worldwide
        </p>
        <nav className="flex gap-4">
          <Link href="/parts" className="hover:text-foreground">
            Parts
          </Link>
          <Link href="/cart" className="hover:text-foreground">
            Cart
          </Link>
          <Link href="/login" className="hover:text-foreground">
            Sign in
          </Link>
        </nav>
      </div>
    </footer>
  );
}
