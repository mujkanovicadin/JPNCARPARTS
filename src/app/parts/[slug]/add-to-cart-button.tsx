"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useCart } from "@/lib/cart/cart-context";
import type { Product } from "@/lib/catalog/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (product.priceMinorUnits === null) {
    return (
      <p className="w-fit rounded-sm border border-border px-6 py-2.5 text-sm text-muted-foreground">
        Price on request — contact us before ordering this part.
      </p>
    );
  }

  const priceMinorUnits = product.priceMinorUnits;
  const image = product.images[0] ?? "/part-placeholder.svg";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      className="w-fit rounded-sm bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          name: product.canonicalName,
          brand: product.brand.name,
          unitPriceMinorUnits: priceMinorUnits,
          currency: product.currency,
          image,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? "Added to cart" : "Add to cart"}
    </motion.button>
  );
}
