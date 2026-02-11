import Image from "next/image"
import Link from "next/link"
import { Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  const bestPrice = product.prices[0]

  return (
    <div className="overflow-hidden rounded-xl border-2 border-primary/20 bg-card">
      <div className="border-b border-primary/10 bg-primary/5 px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Our Pick
        </p>
      </div>
      <div className="flex flex-col gap-5 p-5 sm:flex-row">
        {/* Product image */}
        <div className="flex items-center justify-center rounded-lg bg-muted p-4 sm:w-48">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={160}
            height={160}
            className="h-36 w-36 object-contain"
            unoptimized
          />
        </div>

        {/* Product info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-foreground">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">/ 5.0</span>
          </div>

          <h3 className="mt-1 font-serif text-xl font-bold text-foreground">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          {bestPrice && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{bestPrice.price}</span>
              {bestPrice.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {bestPrice.originalPrice}
                </span>
              )}
            </div>
          )}

          {/* Affiliate buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.affiliateLinks.map((link) => (
              <Link key={link.storeSlug} href={`/go/${product.id}`}>
                <Button className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                  {link.buttonText}
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            ))}
            <Link href={`/product/${product.slug}`}>
              <Button variant="outline" size="sm">
                Full Review
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
