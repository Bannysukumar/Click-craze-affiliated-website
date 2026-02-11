import { getPosts, getStores } from "@/lib/data"
import { AdminAnalyticsClient } from "./admin-analytics-client"

export default async function AdminAnalyticsPage() {
  const [posts, stores] = await Promise.all([getPosts(), getStores()])
  return <AdminAnalyticsClient posts={posts} stores={stores} />
}
