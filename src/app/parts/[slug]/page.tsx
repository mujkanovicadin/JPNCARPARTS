import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/catalog/queries";
import { formatMoney } from "@/lib/money";
import { StatusTag } from "@/components/status-tag";
import { AddToCartButton } from "./add-to-cart-button";
import type { VerificationStatus, Vehicle } from "@/lib/catalog/types";

const AVAILABILITY: Record<
  string,
  { label: string; tone: "positive" | "neutral" | "warning" }
> = {
  in_stock: { label: "In stock", tone: "positive" },
  made_to_order: { label: "Made to order", tone: "neutral" },
  backordered: { label: "Backordered", tone: "warning" },
};

const VERIFICATION_TONE: Record<VerificationStatus, "positive" | "neutral" | "warning"> = {
  VERIFIED: "positive",
  SUPPLIER_CONFIRMED: "positive",
  INFERRED: "neutral",
  UNKNOWN: "warning",
  NOT_COMPATIBLE: "warning",
};

function formatVehicle(vehicle: Vehicle): string {
  const generation = vehicle.generation ? ` (${vehicle.generation})` : "";
  const years = vehicle.yearEnd ? `${vehicle.yearStart}–${vehicle.yearEnd}` : `${vehicle.yearStart}+`;
  return `${vehicle.make} ${vehicle.model}${generation}, ${years}`;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const availability = AVAILABILITY[product.availability];
  const image = product.images[0] ?? "/part-placeholder.svg";
  const primaryPartNumber = product.partNumbers[0];

  return (
    <main className="mx-auto max-w-4xl flex-1 px-6 py-12">
      <p className="mb-6 font-mono text-xs uppercase tracking-wide text-muted-foreground">
        <Link href="/parts" className="hover:text-foreground">
          Parts
        </Link>
        {product.categorySlug ? (
          <>
            {" / "}
            <Link href={`/parts?category=${product.categorySlug}`} className="hover:text-foreground">
              {product.categoryName}
            </Link>
          </>
        ) : null}
      </p>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted">
          <Image
            src={image}
            alt={product.canonicalName}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              {product.brand.name}
            </p>
            <h1 className="mt-1 text-2xl font-semibold">{product.canonicalName}</h1>
          </div>

          <p className="font-mono font-tabular text-3xl font-semibold">
            {product.priceMinorUnits !== null
              ? formatMoney(product.priceMinorUnits, product.currency)
              : "Price on request"}
          </p>

          <StatusTag tone={availability.tone} className="w-fit">
            {availability.label}
          </StatusTag>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="divide-y divide-border rounded-md border border-border font-mono text-xs">
            {primaryPartNumber ? (
              <div className="flex justify-between px-3 py-2">
                <dt className="text-muted-foreground">Part number</dt>
                <dd className="font-tabular">{primaryPartNumber.number}</dd>
              </div>
            ) : null}
            {product.countryOfOrigin ? (
              <div className="flex justify-between px-3 py-2">
                <dt className="text-muted-foreground">Origin</dt>
                <dd>{product.countryOfOrigin}</dd>
              </div>
            ) : null}
            {product.specifications.map((spec) => (
              <div key={spec} className="flex justify-between px-3 py-2 gap-4">
                <dt className="text-muted-foreground">Spec</dt>
                <dd className="text-right">{spec}</dd>
              </div>
            ))}
          </dl>

          {product.partNumbers.some((pn) => pn.notes) ? (
            <p className="text-xs text-muted-foreground">
              {product.partNumbers.find((pn) => pn.notes)?.notes}
            </p>
          ) : null}

          <div>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Compatible vehicles
            </h2>
            {product.compatibility.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Compatibility not yet documented for this part.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {product.compatibility.map((entry) => (
                  <li key={entry.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="size-1 rounded-full bg-primary" />
                      {formatVehicle(entry.vehicle)}
                      <StatusTag tone={VERIFICATION_TONE[entry.verificationStatus]}>
                        {entry.verificationStatus.replace("_", " ")}
                      </StatusTag>
                    </div>
                    {entry.notes ? (
                      <p className="pl-3 text-xs text-muted-foreground">{entry.notes}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              SUPPLIER CONFIRMED means the fitment claim comes directly from the
              manufacturer&apos;s own listing. INFERRED means it was confirmed via a
              secondary/retailer source. We&apos;ll verify fitment again before your
              order ships.
            </p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
