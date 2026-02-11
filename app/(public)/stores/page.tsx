import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Package, FileText } from "lucide-react"
import { getStores } from "@/lib/data"

export const metadata: Metadata = {
  title: "Stores - Browse by Retailer",
  description:
    "Browse our curated deals and product reviews organized by store. Amazon, Flipkart, Best Buy, Walmart and more.",
}

export default async function StoresPage() {
  const stores = await getStores()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          Stores
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse deals and reviews by your favorite retailers.
        </p>
      </div>

      {stores.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-medium text-foreground">No stores yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add stores in the admin to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stores.map((store) => (
            <Link
              key={store.slug}
              href={`/stores/${store.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-xl font-bold text-foreground">
                {store.name.charAt(0)}
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary">
                {store.name}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {store.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  {store.postCount} articles
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" />
                  {store.productCount} products
                </span>
              </div>
              <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                Browse store
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
