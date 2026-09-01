import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/catalog/products";
import { categories } from "@/lib/catalog/categories";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Genuine Japanese automotive parts, delivered internationally.
          </h1>
          <p className="max-w-xl text-muted-foreground">
            OEM and performance parts for Japanese vehicles, sourced from Japan and
            shipped to enthusiasts, workshops, and collectors worldwide.
          </p>
          <Button size="lg" render={<Link href="/parts">Browse parts</Link>} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-xl font-semibold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.slug} href={`/parts?category=${category.slug}`}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col gap-1 py-6 text-center">
                  <p className="font-medium">{category.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <h2 className="mb-6 text-xl font-semibold">Featured parts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <Link key={product.id} href={`/parts/${product.slug}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardContent className="flex flex-col gap-3">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 640px) 25vw, 50vw"
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
        </section>
      ) : null}
    </main>
  );
}
