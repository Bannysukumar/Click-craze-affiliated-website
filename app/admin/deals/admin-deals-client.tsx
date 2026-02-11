"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, MoreHorizontal, Edit2, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Deal } from "@/lib/types"

export function AdminDealsClient({ deals = [] }: { deals: Deal[] }) {
  const [search, setSearch] = useState("")

  const filtered = deals.filter(
    (deal) =>
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.store.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Deals</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your deals, coupons, and limited-time offers (from Firebase).
          </p>
        </div>
        <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/admin/deals/new">
            <Plus className="h-4 w-4" />
            Add Deal
          </Link>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {filtered.length} deal{filtered.length !== 1 && "s"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filtered.length === 0 ? (
              <p className="px-6 py-4 text-sm text-muted-foreground">No deals yet. Add them in Firebase.</p>
            ) : (
              filtered.map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.title}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {deal.title}
                    </p>
                    <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{deal.store}</span>
                      <span>&middot;</span>
                      <span>
                        Expires {new Date(deal.expiryDate).toLocaleDateString()}
                      </span>
                      {deal.couponCode && (
                        <>
                          <span>&middot;</span>
                          <span className="font-mono font-medium text-primary">
                            {deal.couponCode}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="hidden items-center gap-3 sm:flex">
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{deal.dealPrice}</p>
                      <p className="text-xs text-muted-foreground line-through">
                        {deal.originalPrice}
                      </p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      {deal.discount}
                    </span>
                    {deal.highlight && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground capitalize">
                        {deal.highlight}
                      </span>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-3.5 w-3.5" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-3.5 w-3.5" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
