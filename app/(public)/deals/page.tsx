import type { Metadata } from "next"
import { DealsListClient } from "@/components/deals/deals-list-client"
import { getActiveDeals, getStores } from "@/lib/data"

export const metadata: Metadata = {
  title: "Best Deals & Coupons - Save Money Today",
  description:
    "Browse the latest deals, coupons and discounts from top stores. Updated daily with verified offers.",
}

export default async function DealsPage() {
  const [deals, stores] = await Promise.all([
    getActiveDeals(),
    getStores(),
  ])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          Deals & Coupons
        </h1>
        <p className="mt-2 text-muted-foreground">
          Hand-picked deals verified and updated daily.
        </p>
      </div>
      <DealsListClient deals={deals} stores={stores} />
    </div>
  )
}
