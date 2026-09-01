export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "SUPPLIER_PURCHASE_PENDING"
  | "SUPPLIER_ORDERED"
  | "SUPPLIER_CONFIRMED"
  | "INBOUND"
  | "READY_TO_SHIP"
  | "SHIPPED"
  | "DELIVERED"
  | "SUPPLIER_OUT_OF_STOCK"
  | "SUPPLIER_CANCELLED"
  | "CUSTOMER_CANCELLED"
  | "REFUND_PENDING"
  | "REFUNDED";

export const ORDER_STATUSES: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PAID",
  "SUPPLIER_PURCHASE_PENDING",
  "SUPPLIER_ORDERED",
  "SUPPLIER_CONFIRMED",
  "INBOUND",
  "READY_TO_SHIP",
  "SHIPPED",
  "DELIVERED",
  "SUPPLIER_OUT_OF_STOCK",
  "SUPPLIER_CANCELLED",
  "CUSTOMER_CANCELLED",
  "REFUND_PENDING",
  "REFUNDED",
];

export interface OrderItemSnapshot {
  productId: string;
  slug: string;
  name: string;
  unitPriceMinorUnits: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface StatusHistoryEntry {
  from: OrderStatus | null;
  to: OrderStatus;
  at: string;
  note?: string;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  currency: string;
  items: OrderItemSnapshot[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  shipping_address: ShippingAddress;
  status_history: StatusHistoryEntry[];
  created_at: string;
  updated_at: string;
}
