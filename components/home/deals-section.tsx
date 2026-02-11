import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Flame, TrendingUp, Sparkles, BadgeCheck, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Deal } from "@/lib/types"

const highlightConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  hot: {
    label: "Hot Deal",
    icon: <Flame className="h-3 w-3" />,
    className: "bg-destructive text-destructive-foreground",
  },
  trending: {
    label: "Trending",
    icon: <TrendingUp className="h-3 w-3" />,
    className: "bg-primary text-primary-foreground",
  },
  new: {
    label: "New",
    icon: <Sparkles className="h-3 w-3" />,
    className: "bg-foreground text-background",
  },
  verified: {
    label: "Verified",
    icon: <BadgeCheck className="h-3 w-3" />,
    className: "bg-green-600 text-white",
  },
}

export function DealsSection({ deals: allDeals = [] }: { deals?: Deal[] }) {
  const deals = allDeals.slice(0, 4)

  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Trending Deals
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-picked deals updated daily
            </p>
          </div>
          <Link href="/deals" className="group flex items-center gap-1 text-sm font-medium text-primary">
            View all deals
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => {
            const highlight = deal.highlight ? highlightConfig[deal.highlight] : null
            return (
              <div
                key={deal.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {highlight && (
                    <Badge className={`absolute left-3 top-3 gap-1 ${highlight.className}`}>
                      {highlight.icon}
                      {highlight.label}
                    </Badge>
                  )}
                  <div className="absolute right-3 top-3 rounded-md bg-foreground/90 px-2 py-1 text-xs font-bold text-background">
                    {deal.discount} OFF
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-medium text-muted-foreground">{deal.store}</p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                    {deal.title}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-primary">{deal.dealPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {deal.originalPrice}
                    </span>
                  </div>

                  {deal.couponCode && (
                    <div className="mt-2 flex items-center gap-2 rounded-md border border-dashed border-primary/40 bg-primary/5 px-3 py-1.5">
                      <code className="flex-1 text-xs font-semibold text-primary">
                        {deal.couponCode}
                      </code>
                      <Copy className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}

                  <div className="mt-auto pt-3">
                    <Link href={`/go/${deal.id}`}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="sm">
                        Get Deal
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
