"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ userEmail }: { userEmail: string | null }) {
  const { itemCount } = useCart();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          JPN Car Parts
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/parts"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Parts
          </Link>
          <Link
            href="/cart"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Cart{itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>
          {userEmail ? (
            <>
              <Link
                href="/orders"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Orders
              </Link>
              <Link
                href="/account"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Account
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
