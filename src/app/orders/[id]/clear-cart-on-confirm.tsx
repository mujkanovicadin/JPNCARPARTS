"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart/cart-context";

export function ClearCartOnConfirm({ confirmed }: { confirmed: boolean }) {
  const { clear } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (confirmed && !cleared.current) {
      cleared.current = true;
      clear();
    }
  }, [confirmed, clear]);

  return null;
}
