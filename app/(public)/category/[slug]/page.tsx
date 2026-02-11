import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock } from "lucide-react"
import { getCategoryBySlug, getPostsByCategory, getCategories } from "@/lib/data"

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: "Category Not Found" }

  return {
    title: category.seo.title,
    description: category.seo.description,
    alternates: { canonical: `/category/${category.slug}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryPosts = await getPostsByCategory(slug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
          {category.description}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {categoryPosts.length} articles in this category
        </p>
      </div>

      {categoryPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-medium text-foreground">No articles yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Check back soon for new content in this category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPosts.map((post) => (
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
