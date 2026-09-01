import Link from "next/link";
import Image from "next/image";
import { searchProducts } from "@/lib/catalog/products";
import { categories } from "@/lib/catalog/categories";
import { formatMoney } from "@/lib/money";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
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
          <h1 className="text-2xl font-semibold">Parts</h1>
          <p className="text-sm text-muted-foreground">
            {results.length} part{results.length === 1 ? "" : "s"}
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

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/parts"
          className={cn(
            buttonVariants({ variant: !category ? "default" : "outline", size: "sm" })
          )}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/parts?category=${cat.slug}`}
            className={cn(
              buttonVariants({
                variant: category === cat.slug ? "default" : "outline",
                size: "sm",
              })
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-muted-foreground">No parts match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <Link key={product.id} href={`/parts/${product.slug}`}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col gap-3">
                  <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      {product.brand}
                    </p>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <p className="font-semibold">
                    {formatMoney(product.priceMinorUnits, product.currency)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
