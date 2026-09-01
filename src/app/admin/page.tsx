import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { isAdminEmail } from "@/lib/auth/is-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatMoney } from "@/lib/money";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatusSelect } from "./order-status-select";
import type { Order } from "@/lib/orders/types";

export default async function AdminPage() {
  const user = await getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/");
  }

  const admin = createAdminClient();
  const { data: orders } = await admin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Order[]>();

  return (
    <main className="mx-auto max-w-5xl flex-1 px-6 py-12">
      <h1 className="mb-2 text-2xl font-semibold">Admin: Orders</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Product catalog management isn&apos;t built yet — the catalog is still mock
        data until Phase 2 introduces a real products table.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>All orders ({orders?.length ?? 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {!orders || orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-2 border-b pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">Order {order.id.slice(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleString()} · user{" "}
                      {order.user_id.slice(0, 8)} ·{" "}
                      {formatMoney(order.total, order.currency)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{order.status}</Badge>
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
