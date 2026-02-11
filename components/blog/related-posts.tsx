import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import type { Post } from "@/lib/types"

export function RelatedPosts({ posts }: { posts: Post[] }) {
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6 lg:py-14">
        <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
          Related Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-primary">{post.category}</span>
                  <span>{"·"}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </span>
                </div>
                <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
