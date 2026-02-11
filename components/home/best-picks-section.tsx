import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

export function BestPicksSection({ products = [] }: { products?: Product[] }) {
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Best Picks
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Our top-rated products, tested and reviewed
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const bestPrice = product.prices[0]
            return (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-center bg-muted p-6">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-40 w-40 object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      {product.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">/ 5.0</span>
                  </div>
                  <h3 className="mt-2 font-semibold leading-snug text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {product.shortDescription}
                  </p>

                  {bestPrice && (
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">{bestPrice.price}</span>
                      {bestPrice.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {bestPrice.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">on {bestPrice.store}</span>
                    </div>
                  )}

                  <div className="mt-auto flex gap-2 pt-4">
                    <Link href={`/product/${product.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent" size="sm">
                        Read Review
                      </Button>
                    </Link>
                    <Link href={`/go/${product.id}`}>
                      <Button className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                        Buy
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
