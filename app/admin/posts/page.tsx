import { getPosts } from "@/lib/data"
import { AdminPostsClient } from "./admin-posts-client"

export default async function AdminPostsPage() {
  const posts = await getPosts()
  return <AdminPostsClient posts={posts} />
}
