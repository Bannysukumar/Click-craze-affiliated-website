import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/types"

export function HeroSection({
  featuredPosts = [],
}: {
  featuredPosts?: Post[]
}) {
  const mainPost = featuredPosts[0]
  const sidePosts = featuredPosts.slice(1, 3)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-foreground lg:text-3xl">
          Editor&apos;s Picks
        </h2>
        <Link href="/blog" className="group flex items-center gap-1 text-sm font-medium text-primary">
          View all articles
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Main featured post */}
        {mainPost && (
          <Link
            href={`/blog/${mainPost.slug}`}
            className="group relative overflow-hidden rounded-xl lg:col-span-3"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <Image
                src={mainPost.featuredImage || "/placeholder.svg"}
                alt={mainPost.title}
                width={800}
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">
              <span className="mb-2 inline-block rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                {mainPost.category}
              </span>
              <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-white lg:text-3xl">
                {mainPost.title}
              </h3>
              <p className="line-clamp-2 max-w-xl text-sm text-white/80">
                {mainPost.excerpt}
              </p>
            </div>
          </Link>
        )}

        {/* Side posts */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {sidePosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative flex-1 overflow-hidden rounded-xl"
            >
              <div className="aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full">
                <Image
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <span className="mb-1.5 inline-block rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                  {post.category}
                </span>
                <h3 className="font-serif text-base font-bold leading-snug text-white lg:text-lg">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex items-center justify-center">
        <Link href="/deals">
          <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            View Best Deals
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
