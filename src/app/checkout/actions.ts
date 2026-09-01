"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductById } from "@/lib/catalog/products";
import { logger } from "@/lib/logger";
import type {
  Order,
  OrderItemSnapshot,
  StatusHistoryEntry,
} from "@/lib/orders/types";

const FLAT_SHIPPING_COST_MINOR_UNITS = 4900;

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
});

const shippingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  line1: z.string().min(1, "Address is required."),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  region: z.string().min(1, "State / region is required."),
  postalCode: z.string().min(1, "Postal code is required."),
  country: z.string().min(1, "Country is required."),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Your cart is empty."),
  shippingAddress: shippingAddressSchema,
});

export interface CheckoutFormState {
  error: string | null;
}

export async function placeOrder(
  cartItems: { productId: string; quantity: number }[],
  _prevState: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  const parsed = checkoutSchema.safeParse({
    items: cartItems,
    shippingAddress: {
      fullName: formData.get("fullName"),
      line1: formData.get("line1"),
      line2: formData.get("line2") || undefined,
      city: formData.get("city"),
      region: formData.get("region"),
      postalCode: formData.get("postalCode"),
      country: formData.get("country"),
    },
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid checkout details." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to check out." };
  }

  // Prices are never trusted from the client. Every line item is re-priced
  // here from the authoritative catalog.
  const orderItems: OrderItemSnapshot[] = [];
  let currency: string | null = null;

  for (const cartItem of parsed.data.items) {
    const product = getProductById(cartItem.productId);
    if (!product) {
      return { error: "One of the items in your cart is no longer available." };
    }
    if (currency && currency !== product.currency) {
      return { error: "Mixed-currency carts are not supported yet." };
    }
    currency = product.currency;
    orderItems.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      unitPriceMinorUnits: product.priceMinorUnits,
      quantity: cartItem.quantity,
    });
  }

  const subtotal = orderItems.reduce(
    (total, item) => total + item.unitPriceMinorUnits * item.quantity,
    0
  );
  const shippingCost = FLAT_SHIPPING_COST_MINOR_UNITS;
  const total = subtotal + shippingCost;

  const now = new Date().toISOString();
  const initialHistory: StatusHistoryEntry[] = [
    { from: null, to: "PENDING_PAYMENT", at: now },
  ];

  const { data: order, error: insertError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "PENDING_PAYMENT",
      currency: currency ?? "USD",
      items: orderItems,
      subtotal,
      shipping_cost: shippingCost,
      total,
      shipping_address: parsed.data.shippingAddress,
      status_history: initialHistory,
    })
    .select()
    .single<Order>();

  if (insertError || !order) {
    logger.error("Failed to create order", { message: insertError?.message });
    return { error: "Could not create your order. Please try again." };
  }

  // Simulated payment step (no real Stripe integration yet).
  const paidHistory: StatusHistoryEntry[] = [
    ...order.status_history,
    { from: "PENDING_PAYMENT", to: "PAID", at: new Date().toISOString(), note: "Simulated payment" },
  ];

  // A real integration would flip this via a Stripe webhook using the
  // service-role client; this simulates that trusted-server transition.
  const admin = createAdminClient();
  const { error: updateError } = await admin
    .from("orders")
    .update({ status: "PAID", status_history: paidHistory, updated_at: new Date().toISOString() })
    .eq("id", order.id);

  if (updateError) {
    logger.error("Failed to mark order paid", { orderId: order.id, message: updateError.message });
    return { error: "Payment could not be confirmed. Please contact support." };
  }

  redirect(`/orders/${order.id}?confirmed=1`);
}
