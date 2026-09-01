import Link from "next/link";
import { searchProducts } from "@/lib/catalog/products";
import { categories } from "@/lib/catalog/categories";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function PartsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const results = searchProducts({ category, query: q });

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Catalog
          </p>
          <h1 className="text-2xl font-semibold">Parts</h1>
          <p className="font-mono text-sm text-muted-foreground">
            {String(results.length).padStart(2, "0")} result
            {results.length === 1 ? "" : "s"}
          </p>
        </div>
        <form className="flex gap-2" action="/parts" method="get">
          {category ? <input type="hidden" name="category" value={category} /> : null}
          <Input
            type="search"
            name="q"
            placeholder="Search by name, brand, or part number"
            defaultValue={q}
            className="w-64"
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      </div>

      <div className="mb-8 flex flex-wrap gap-1 border-y border-border/80 py-3 font-mono text-xs uppercase tracking-wide">
        <Link
          href="/parts"
          className={cn(
            "rounded-sm px-2.5 py-1 transition-colors",
            !category
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/parts?category=${cat.slug}`}
            className={cn(
              "rounded-sm px-2.5 py-1 transition-colors",
              category === cat.slug
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-muted-foreground">No parts match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
