"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useCart } from "@/lib/cart/cart-context";
import type { Product } from "@/lib/catalog/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      className="w-fit rounded-sm bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
    </motion.button>
  );
}
