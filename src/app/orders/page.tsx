import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth/get-user";
import { formatMoney } from "@/lib/money";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/lib/orders/types";

export default async function OrdersPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Order[]>();

  return (
    <main className="mx-auto max-w-3xl flex-1 px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Your orders</h1>

      {!orders || orders.length === 0 ? (
        <p className="text-muted-foreground">
          You haven&apos;t placed any orders yet.{" "}
          <Link href="/parts" className="underline">
            Browse parts
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">Order {order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()} ·{" "}
                      {order.items.length} item{order.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{order.status}</Badge>
                    <span className="font-medium">
                      {formatMoney(order.total, order.currency)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
