import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, ExternalLink, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductBySlug, getProducts } from "@/lib/data"
import { FaqSection } from "@/components/blog/faq-section"

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Product Not Found" }

  return {
    title: product.seo.title || product.name,
    description: product.seo.description || product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.image,
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating,
        bestRating: 5,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: 1,
    },
    offers: product.prices.map((p) => ({
      "@type": "Offer",
      price: p.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      seller: { "@type": "Organization", name: p.store },
      availability: "https://schema.org/InStock",
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6 lg:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-primary">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl bg-muted p-8">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="h-72 w-72 object-contain lg:h-96 lg:w-96"
              priority
              unoptimized
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={`star-${i}`}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">/ 5.0</span>
            </div>

            <h1 className="mt-3 font-serif text-2xl font-bold text-foreground lg:text-3xl">
              {product.name}
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>

            <div className="mt-6 space-y-3">
              {product.prices.map((price) => (
                <div
                  key={price.store}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{price.store}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">{price.price}</span>
                      {price.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {price.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/go/${product.id}`}>
                    <Button className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                      Buy Now
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {product.specs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
              Specifications
            </h2>
            <div className="overflow-hidden rounded-xl border border-border">
              {product.specs.map((spec, i) => (
                <div
                  key={spec.key}
                  className={`flex items-center justify-between px-5 py-3 ${
                    i % 2 === 0 ? "bg-muted/50" : "bg-card"
                  }`}
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {spec.key}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.whyBuy.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
              Why Buy This Product
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {product.whyBuy.map((reason) => (
                <div
                  key={reason}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.alternatives.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
              Alternatives to Consider
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.alternatives.map((alt) => (
                <span
                  key={alt}
                  className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.faqs.length > 0 && (
          <div className="mt-12">
            <FaqSection faqs={product.faqs} />
          </div>
        )}
      </div>
    </>
  )
}
