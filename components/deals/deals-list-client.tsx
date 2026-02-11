"use client"

import React from "react"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Flame, TrendingUp, Sparkles, BadgeCheck, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Deal, Store } from "@/lib/types"

const highlightConfig: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  hot: { label: "Hot Deal", icon: <Flame className="h-3 w-3" />, className: "bg-destructive text-destructive-foreground" },
  trending: { label: "Trending", icon: <TrendingUp className="h-3 w-3" />, className: "bg-primary text-primary-foreground" },
  new: { label: "New", icon: <Sparkles className="h-3 w-3" />, className: "bg-foreground text-background" },
  verified: { label: "Verified", icon: <BadgeCheck className="h-3 w-3" />, className: "bg-green-600 text-white" },
}

export function DealsListClient({
  deals: allDeals = [],
  stores = [],
}: {
  deals?: Deal[]
  stores?: Store[]
}) {
  const [selectedStore, setSelectedStore] = useState("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredDeals = useMemo(() => {
    if (selectedStore === "all") return allDeals
    return allDeals.filter((d) => d.storeSlug === selectedStore)
  }, [allDeals, selectedStore])

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div>
      {/* Store filter */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Button
          variant={selectedStore === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedStore("all")}
          className={selectedStore === "all" ? "bg-primary text-primary-foreground" : ""}
        >
          All Stores
        </Button>
        {stores.map((store) => (
          <Button
            key={store.slug}
            variant={selectedStore === store.slug ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStore(store.slug)}
            className={selectedStore === store.slug ? "bg-primary text-primary-foreground" : ""}
          >
            {store.name}
          </Button>
        ))}
      </div>

      {/* Deals grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDeals.map((deal) => {
          const highlight = deal.highlight ? highlightConfig[deal.highlight] : null
          return (
            <div
              key={deal.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            >
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

              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium text-muted-foreground">{deal.store}</p>
                <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">
                  {deal.title}
                </h3>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{deal.dealPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {deal.originalPrice}
                  </span>
                </div>

                {deal.couponCode && (
                  <button
                    type="button"
                    onClick={() => handleCopy(deal.couponCode!)}
                    className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-primary/40 bg-primary/5 px-3 py-2 transition-colors hover:bg-primary/10"
                  >
                    <code className="flex-1 text-left text-sm font-semibold text-primary">
                      {deal.couponCode}
                    </code>
                    {copiedCode === deal.couponCode ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4 text-primary" />
                    )}
                  </button>
                )}

                <p className="mt-2 text-xs text-muted-foreground">
                  Expires:{" "}
                  {new Date(deal.expiryDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-auto pt-4">
                  <Link href={`/go/${deal.id}`}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
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
  )
}
