"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "./actions";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/orders/types";

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-end gap-1">
      <Select
        value={status}
        onValueChange={(value) => {
          const nextStatus = value as OrderStatus;
          setStatus(nextStatus);
          setError(null);
          startTransition(async () => {
            const result = await updateOrderStatus({ orderId, status: nextStatus });
            if (result.error) {
              setError(result.error);
              setStatus(currentStatus);
            }
          });
        }}
        disabled={pending}
      >
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ORDER_STATUSES.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
