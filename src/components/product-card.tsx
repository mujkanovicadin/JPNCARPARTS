"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { formatMoney } from "@/lib/money";
import { StatusTag } from "@/components/status-tag";
import type { Availability, ProductSummary } from "@/lib/catalog/types";

const AVAILABILITY: Record<Availability, { label: string; tone: "positive" | "neutral" | "warning" }> = {
  in_stock: { label: "In stock", tone: "positive" },
  made_to_order: { label: "Made to order", tone: "neutral" },
  backordered: { label: "Backordered", tone: "warning" },
};

export function ProductCard({ product, index = 0 }: { product: ProductSummary; index?: number }) {
  const availability = AVAILABILITY[product.availability];
  const image = product.images[0] ?? "/part-placeholder.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={`/parts/${product.slug}`}
        className="group block overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary/40"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={image}
            alt={product.canonicalName}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute right-2 top-2">
            <StatusTag tone={availability.tone}>{availability.label}</StatusTag>
          </div>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground">
            {product.brandName}
            {product.primaryPartNumber ? ` · ${product.primaryPartNumber}` : ""}
          </p>
          <p className="font-medium leading-snug">{product.canonicalName}</p>
          <p className="font-mono font-tabular text-lg font-semibold text-foreground">
            {product.priceMinorUnits !== null
              ? formatMoney(product.priceMinorUnits, product.currency)
              : "Price on request"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
