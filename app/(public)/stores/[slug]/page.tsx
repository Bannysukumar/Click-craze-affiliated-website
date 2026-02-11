import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStoreBySlug, getDealsByStore, getStores, getPublishedPosts } from "@/lib/data"

export async function generateStaticParams() {
  const stores = await getStores()
  return stores.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const store = await getStoreBySlug(slug)
  if (!store) return { title: "Store Not Found" }

  return {
    title: `${store.name} - Best Deals & Reviews`,
    description: store.description,
  }
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const store = await getStoreBySlug(slug)
  if (!store) notFound()

  const [storeDeals, storePosts] = await Promise.all([
    getDealsByStore(slug),
    getPublishedPosts().then((posts) => posts.slice(0, 3)),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/stores" className="hover:text-primary">Stores</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{store.name}</span>
      </nav>

      <div className="mb-10 flex items-start gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-2xl font-bold text-foreground">
          {store.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">{store.name}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
            {store.description}
          </p>
        </div>
      </div>

      {storeDeals.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
            Active Deals from {store.name}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {storeDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{deal.title}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">{deal.dealPrice}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {deal.originalPrice}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-primary/10 text-primary">{deal.discount} OFF</Badge>
                </div>
                <div className="mt-auto pt-4">
                  <Link href={`/go/${deal.id}`}>
                    <Button className="w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                      Get Deal
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
          Related Articles
        </h2>
        {storePosts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No articles yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {storePosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{post.category}</span>
                    <span>{"·"}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
