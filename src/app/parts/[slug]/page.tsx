import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/catalog/products";
import { getCategoryBySlug } from "@/lib/catalog/categories";
import { formatMoney } from "@/lib/money";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "./add-to-cart-button";

const AVAILABILITY_LABEL: Record<string, string> = {
  in_stock: "In stock",
  made_to_order: "Made to order",
  backordered: "Backordered",
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

  return (
    <main className="mx-auto max-w-4xl flex-1 px-6 py-12">
      <p className="mb-4 text-sm text-muted-foreground">
        <Link href="/parts" className="underline">
          Parts
        </Link>
        {category ? (
          <>
            {" / "}
            <Link href={`/parts?category=${category.slug}`} className="underline">
              {category.name}
            </Link>
          </>
        ) : null}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm uppercase text-muted-foreground">{product.brand}</p>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">
              Part number: {product.partNumber}
            </p>
          </div>

          <p className="text-2xl font-semibold">
            {formatMoney(product.priceMinorUnits, product.currency)}
          </p>

          <Badge variant={product.availability === "in_stock" ? "default" : "secondary"}>
            {AVAILABILITY_LABEL[product.availability]}
          </Badge>

          <p className="text-sm leading-relaxed">{product.description}</p>

          <div>
            <h2 className="mb-2 text-sm font-semibold">Specifications</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {product.specifications.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold">Compatible vehicles</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {product.compatibleVehicles.map((vehicle) => (
                <li key={vehicle}>{vehicle}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
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
