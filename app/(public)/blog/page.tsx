import type { Metadata } from "next"
import { BlogListClient } from "@/components/blog/blog-list-client"
import { getPublishedPosts, getCategories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Blog - Latest Reviews, Guides & Tips",
  description:
    "Read our latest product reviews, buying guides, and money-saving tips. Expert-tested recommendations for every budget.",
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getCategories(),
  ])
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          Blog
        </h1>
        <p className="mt-2 text-muted-foreground">
          Expert reviews, buying guides, and money-saving tips.
        </p>
      </div>
      <BlogListClient posts={posts} categories={categories} />
    </div>
  )
}
