"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { placeOrder, type CheckoutFormState } from "./actions";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const initialState: CheckoutFormState = { error: null };
const SHIPPING_COST_MINOR_UNITS = 4900;

export default function CheckoutPage() {
  const { items, subtotalMinorUnits, isHydrated } = useCart();

  const boundAction = placeOrder.bind(
    null,
    items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
  );
  const [state, formAction, pending] = useActionState(boundAction, initialState);

  if (!isHydrated) {
    return <main className="flex-1" />;
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <Button nativeButton={false} render={<Link href="/parts">Browse parts</Link>} />
      </main>
    );
  }

  const currency = items[0]?.currency ?? "USD";
  const total = subtotalMinorUnits + SHIPPING_COST_MINOR_UNITS;

  return (
    <main className="mx-auto grid max-w-4xl flex-1 gap-8 px-6 py-12 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Shipping address</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" name="fullName" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="line1">Address line 1</Label>
              <Input id="line1" name="line1" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="line2">Address line 2 (optional)</Label>
              <Input id="line2" name="line2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="region">State / region</Label>
                <Input id="region" name="region" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="postalCode">Postal code</Label>
                <Input id="postalCode" name="postalCode" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" required />
              </div>
            </div>
            {state.error ? (
              <p className="text-sm text-destructive">{state.error}</p>
            ) : null}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Placing order..." : "Place test order"}
            </Button>
            <p className="text-xs text-muted-foreground">
              This is a simulated payment. No real charge will be made.
            </p>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 font-mono font-tabular text-sm">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between">
              <span className="font-sans">
                {item.name} × {item.quantity}
              </span>
              <span>
                {formatMoney(item.unitPriceMinorUnits * item.quantity, item.currency)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between">
            <span className="font-sans text-muted-foreground">Subtotal</span>
            <span>{formatMoney(subtotalMinorUnits, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-sans text-muted-foreground">Shipping</span>
            <span>{formatMoney(SHIPPING_COST_MINOR_UNITS, currency)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span className="font-sans">Total</span>
            <span>{formatMoney(total, currency)}</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
