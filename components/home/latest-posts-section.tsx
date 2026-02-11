import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import type { Post } from "@/lib/types"

export function LatestPostsSection({ posts = [] }: { posts?: Post[] }) {
  const latestPosts = posts.slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-14">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Latest Articles
        </h2>
        <Link href="/blog" className="group flex items-center gap-1 text-sm font-medium text-primary">
          View all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <Image
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                width={500}
                height={312}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary">{post.category}</span>
                <span className="text-xs text-muted-foreground">
                  {"·"}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min read
                </span>
              </div>
              <h3 className="mt-2 line-clamp-2 font-serif text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span>{"·"}</span>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
