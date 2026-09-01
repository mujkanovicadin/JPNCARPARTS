import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/catalog/products";
import { getCategoryBySlug } from "@/lib/catalog/categories";
import { formatMoney } from "@/lib/money";
import { StatusTag } from "@/components/status-tag";
import { AddToCartButton } from "./add-to-cart-button";

const AVAILABILITY: Record<
  string,
  { label: string; tone: "positive" | "neutral" | "warning" }
> = {
  in_stock: { label: "In stock", tone: "positive" },
  made_to_order: { label: "Made to order", tone: "neutral" },
  backordered: { label: "Backordered", tone: "warning" },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);
  const availability = AVAILABILITY[product.availability];

  return (
    <main className="mx-auto max-w-4xl flex-1 px-6 py-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        <Link href="/parts" className="hover:text-foreground">
          Parts
        </Link>
        {category ? (
          <>
            {" / "}
            <Link href={`/parts?category=${category.slug}`} className="hover:text-foreground">
              {category.name}
            </Link>
          </>
        ) : null}
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              {product.brand}
            </p>
            <h1 className="mt-1 text-2xl font-semibold">{product.name}</h1>
          </div>

          <p className="font-mono font-tabular text-3xl font-semibold">
            {formatMoney(product.priceMinorUnits, product.currency)}
          </p>

          <StatusTag tone={availability.tone} className="w-fit">
            {availability.label}
          </StatusTag>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="divide-y divide-border rounded-md border border-border font-mono text-xs">
            <div className="flex justify-between px-3 py-2">
              <dt className="text-muted-foreground">Part number</dt>
              <dd className="font-tabular">{product.partNumber}</dd>
            </div>
            <div className="flex justify-between px-3 py-2">
              <dt className="text-muted-foreground">Origin</dt>
              <dd>{product.countryOfOrigin}</dd>
            </div>
            {product.specifications.map((spec) => (
              <div key={spec} className="flex justify-between px-3 py-2 gap-4">
                <dt className="text-muted-foreground">Spec</dt>
                <dd className="text-right">{spec}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Compatible vehicles
            </h2>
            <ul className="space-y-1 text-sm">
              {product.compatibleVehicles.map((vehicle) => (
                <li key={vehicle} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary" />
                  {vehicle}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              Compatibility shown here is inferred from catalog data and has not been
              verified against a manufacturer source. We&apos;ll confirm fitment before
              your order ships.
            </p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
