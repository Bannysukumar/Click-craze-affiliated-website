"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, MousePointerClick, TrendingUp, ExternalLink } from "lucide-react"
import type { Post, Store } from "@/lib/types"

const mockClickData = [
  { month: "Sep", clicks: 2100 },
  { month: "Oct", clicks: 2800 },
  { month: "Nov", clicks: 3200 },
  { month: "Dec", clicks: 3600 },
  { month: "Jan", clicks: 3400 },
  { month: "Feb", clicks: 3847 },
]

export function AdminAnalyticsClient({
  posts = [],
  stores = [],
}: {
  posts: Post[]
  stores: Store[]
}) {
  const totalViews = posts.reduce((sum, p) => sum + (p.viewCount ?? 0), 0)
  const topPosts = [...posts]
    .sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your affiliate performance and traffic (data from Firebase).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-xl font-bold text-foreground">
                {totalViews.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <MousePointerClick className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Affiliate Clicks</p>
              <p className="text-xl font-bold text-foreground">—</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conversions</p>
              <p className="text-xl font-bold text-foreground">—</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <ExternalLink className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Est. Revenue</p>
              <p className="text-xl font-bold text-foreground">—</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Click Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-48">
            {mockClickData.map((item) => {
              const maxClicks = Math.max(...mockClickData.map((d) => d.clicks))
              const heightPercent = (item.clicks / maxClicks) * 100
              return (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <span className="text-xs font-medium text-foreground">
                    {item.clicks.toLocaleString()}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-primary/80 transition-all"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Top Posts by Views</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {topPosts.length === 0 ? (
                <p className="px-6 py-4 text-sm text-muted-foreground">No posts yet.</p>
              ) : (
                topPosts.map((post, i) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-3 px-6 py-3"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {post.title}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {(post.viewCount ?? 0).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Stores</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {stores.length === 0 ? (
                <p className="px-6 py-4 text-sm text-muted-foreground">No stores yet. Clicks tracked in Firestore.</p>
              ) : (
                stores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{store.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {store.postCount} posts · {store.productCount} products
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">—</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
