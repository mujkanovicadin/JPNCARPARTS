"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUser } from "@/lib/auth/get-user";
import { isAdminEmail } from "@/lib/auth/is-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { logger } from "@/lib/logger";
import { ORDER_STATUSES, type Order, type StatusHistoryEntry } from "@/lib/orders/types";

const updateStatusSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum(ORDER_STATUSES),
});

export async function updateOrderStatus(input: {
  orderId: string;
  status: string;
}): Promise<{ error: string | null }> {
  const user = await getUser();
  if (!user || !isAdminEmail(user.email)) {
    return { error: "Not authorized." };
  }

  const parsed = updateStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Invalid status." };
  }

  const admin = createAdminClient();
  const { data: order, error: fetchError } = await admin
    .from("orders")
    .select("*")
    .eq("id", parsed.data.orderId)
    .single<Order>();

  if (fetchError || !order) {
    return { error: "Order not found." };
  }

  const historyEntry: StatusHistoryEntry = {
    from: order.status,
    to: parsed.data.status,
    at: new Date().toISOString(),
    note: `Changed by admin ${user.email}`,
  };

  const { error: updateError } = await admin
    .from("orders")
    .update({
      status: parsed.data.status,
      status_history: [...order.status_history, historyEntry],
      updated_at: new Date().toISOString(),
    })
    .eq("id", order.id);

  if (updateError) {
    logger.error("Admin order status update failed", {
      orderId: order.id,
      message: updateError.message,
    });
    return { error: "Could not update order status." };
  }

  revalidatePath("/admin");
  return { error: null };
}
