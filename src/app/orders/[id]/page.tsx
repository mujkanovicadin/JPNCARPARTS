import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/get-user";
import { formatMoney } from "@/lib/money";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClearCartOnConfirm } from "./clear-cart-on-confirm";
import type { Order } from "@/lib/orders/types";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ confirmed?: string }>;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const { confirmed } = await searchParams;

  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single<Order>();

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl flex-1 px-6 py-12">
      <ClearCartOnConfirm confirmed={confirmed === "1"} />

      {confirmed === "1" ? (
        <p className="mb-6 rounded-md bg-secondary px-4 py-3 text-sm text-secondary-foreground">
          Order placed. This was a simulated payment — no real charge was made.
        </p>
      ) : null}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Order {order.id.slice(0, 8)}</h1>
        <Badge variant="secondary">{order.status}</Badge>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {formatMoney(item.unitPriceMinorUnits * item.quantity, order.currency)}
              </span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatMoney(order.subtotal, order.currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatMoney(order.shipping_cost, order.currency)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatMoney(order.total, order.currency)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipping address</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>{order.shipping_address.fullName}</p>
          <p>{order.shipping_address.line1}</p>
          {order.shipping_address.line2 ? <p>{order.shipping_address.line2}</p> : null}
          <p>
            {order.shipping_address.city}, {order.shipping_address.region}{" "}
            {order.shipping_address.postalCode}
          </p>
          <p>{order.shipping_address.country}</p>
        </CardContent>
      </Card>
    </main>
  );
}
