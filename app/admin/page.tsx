import { FileText, Package, Percent, Eye, MousePointerClick, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPosts, getProducts, getDeals } from "@/lib/data"

export default async function AdminDashboard() {
  const [posts, products, deals] = await Promise.all([
    getPosts(),
    getProducts(),
    getDeals(),
  ])

  const activeDeals = deals.filter((d) => d.isActive)
  const totalViews = posts.reduce((sum, p) => sum + (p.viewCount ?? 0), 0)

  const stats = [
    { title: "Total Posts", value: posts.length.toString(), icon: FileText, change: "From Firebase" },
    { title: "Products", value: products.length.toString(), icon: Package, change: "From Firebase" },
    { title: "Active Deals", value: activeDeals.length.toString(), icon: Percent, change: "From Firebase" },
    { title: "Total Views", value: totalViews.toLocaleString(), icon: Eye, change: "From posts" },
    { title: "Affiliate Clicks", value: "—", icon: MousePointerClick, change: "Tracked in Firestore" },
    { title: "Conversion Rate", value: "—", icon: TrendingUp, change: "From analytics" },
  ]

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your affiliate blog (data from Firebase).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentPosts.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">No posts yet. Add posts in Firebase.</p>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b border-border py-3 last:border-0"
                >
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {post.category} &middot;{" "}
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {(post.viewCount ?? 0).toLocaleString()}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : post.status === "draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Active Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {activeDeals.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">No active deals. Add deals in Firebase.</p>
            ) : (
              activeDeals.slice(0, 5).map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-center justify-between border-b border-border py-3 last:border-0"
                >
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {deal.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {deal.store} &middot; Expires{" "}
                      {new Date(deal.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">
                      {deal.discount} OFF
                    </span>
                    {deal.highlight && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                        {deal.highlight}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
