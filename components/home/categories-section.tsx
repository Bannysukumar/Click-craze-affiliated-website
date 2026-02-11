import React from "react"
import Link from "next/link"
import { ArrowRight, Laptop, Home, Shirt, Heart, Monitor, Gamepad2 } from "lucide-react"
import type { Category } from "@/lib/types"

const iconMap: Record<string, React.ReactNode> = {
  electronics: <Laptop className="h-6 w-6" />,
  "home-kitchen": <Home className="h-6 w-6" />,
  fashion: <Shirt className="h-6 w-6" />,
  "health-fitness": <Heart className="h-6 w-6" />,
  "software-apps": <Monitor className="h-6 w-6" />,
  gaming: <Gamepad2 className="h-6 w-6" />,
}

export function CategoriesSection({
  categories = [],
}: {
  categories?: Category[]
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Top Categories
        </h2>
        <Link href="/blog" className="group flex items-center gap-1 text-sm font-medium text-primary">
          Browse all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {iconMap[category.slug] || <Laptop className="h-6 w-6" />}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{category.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {category.postCount} articles
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
