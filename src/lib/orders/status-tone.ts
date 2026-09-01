import type { OrderStatus } from "./types";

export function statusTone(status: OrderStatus): "positive" | "neutral" | "warning" {
  switch (status) {
    case "PAID":
    case "DELIVERED":
    case "SHIPPED":
    case "READY_TO_SHIP":
      return "positive";
    case "SUPPLIER_OUT_OF_STOCK":
    case "SUPPLIER_CANCELLED":
    case "CUSTOMER_CANCELLED":
    case "REFUND_PENDING":
    case "REFUNDED":
      return "warning";
    default:
      return "neutral";
  }
}
