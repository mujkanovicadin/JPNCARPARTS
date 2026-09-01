import Link from "next/link";
import { getFeaturedProducts } from "@/lib/catalog/products";
import { categories } from "@/lib/catalog/categories";
import { ProductCard } from "@/components/product-card";
import { Hero } from "@/components/hero";

const SPEC_STRIP = [
  { label: "Sourced from", value: "Japan" },
  { label: "Categories", value: `${categories.length}` },
  { label: "Ships to", value: "40+ countries" },
  { label: "Fitment", value: "Verified before dispatch" },
];

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <section className="border-b border-border/80 bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          {SPEC_STRIP.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                {item.label}
              </span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Catalog
            </p>
            <h2 className="text-xl font-semibold">Shop by category</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
          {categories.map((category, i) => (
            <Link
              key={category.slug}
              href={`/parts?category=${category.slug}`}
              className={`group flex flex-col justify-between rounded-md border border-border bg-card p-4 transition-colors hover:border-primary/40 ${
                i === 0 ? "col-span-2 sm:col-span-3 sm:row-span-2" : "sm:col-span-3"
              }`}
            >
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 text-lg font-medium transition-colors group-hover:text-primary sm:text-xl">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Selection
              </p>
              <h2 className="text-xl font-semibold">Featured parts</h2>
            </div>
            <Link
              href="/parts"
              className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
