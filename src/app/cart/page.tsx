"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart/cart-context";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, subtotalMinorUnits, removeItem, setQuantity } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Button render={<Link href="/parts">Browse parts</Link>} />
      </main>
    );
  }

  const currency = items[0]?.currency ?? "USD";

  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Your cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 border-b pb-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase text-muted-foreground">{item.brand}</p>
              <Link href={`/parts/${item.slug}`} className="font-medium hover:underline">
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                {formatMoney(item.unitPriceMinorUnits, item.currency)} each
              </p>
            </div>
            <Input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(event) =>
                setQuantity(item.productId, Number(event.target.value))
              }
              className="w-16"
            />
            <p className="w-24 text-right font-medium">
              {formatMoney(item.unitPriceMinorUnits * item.quantity, item.currency)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.productId)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-end gap-2">
        <Separator className="w-full" />
        <div className="flex w-full max-w-xs justify-between font-semibold">
          <span>Subtotal</span>
          <span>{formatMoney(subtotalMinorUnits, currency)}</span>
        </div>
        <Button render={<Link href="/checkout">Checkout</Link>} className="mt-2" />
      </div>
    </main>
  );
}
