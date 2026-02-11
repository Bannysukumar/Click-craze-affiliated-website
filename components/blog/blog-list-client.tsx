"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Clock, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Post, Category } from "@/lib/types"

export function BlogListClient({
  posts: allPosts = [],
  categories = [],
}: {
  posts?: Post[]
  categories?: Category[]
}) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest")
  const [showSort, setShowSort] = useState(false)

  const filteredPosts = useMemo(() => {
    let posts = allPosts

    if (selectedCategory !== "all") {
      posts = posts.filter((p) => p.categorySlug === selectedCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === "popular") {
      posts = [...posts].sort((a, b) => b.viewCount - a.viewCount)
    }

    return posts
  }, [allPosts, search, selectedCategory, sortBy])

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-primary text-primary-foreground" : ""}
            >
              All
            </Button>
            {categories.slice(0, 4).map((cat) => (
              <Button
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.slug)}
                className={
                  selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : ""
                }
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSort(!showSort)}
              className="gap-1"
            >
              {sortBy === "latest" ? "Latest" : "Popular"}
              <ChevronDown className="h-3 w-3" />
            </Button>
            {showSort && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} onKeyDown={(e) => e.key === "Escape" && setShowSort(false)} role="button" tabIndex={-1} aria-label="Close sort dropdown" />
                <div className="absolute right-0 top-full z-50 mt-1 w-32 rounded-lg border border-border bg-card p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy("latest")
                      setShowSort(false)
                    }}
                    className="block w-full rounded-md px-3 py-1.5 text-left text-sm hover:bg-secondary"
                  >
                    Latest
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSortBy("popular")
                      setShowSort(false)
                    }}
                    className="block w-full rounded-md px-3 py-1.5 text-left text-sm hover:bg-secondary"
                  >
                    Most Viewed
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-medium text-foreground">No articles found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
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
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-primary">{post.category}</span>
                  <span className="text-muted-foreground">{"·"}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </span>
                </div>
                <h2 className="mt-2 line-clamp-2 font-serif text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </h2>
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
      )}
    </div>
  )
}
