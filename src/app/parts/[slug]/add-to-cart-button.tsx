"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/catalog/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <Button
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          unitPriceMinorUnits: product.priceMinorUnits,
          currency: product.currency,
          image: product.image,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? "Added to cart" : "Add to cart"}
    </Button>
  );
}
