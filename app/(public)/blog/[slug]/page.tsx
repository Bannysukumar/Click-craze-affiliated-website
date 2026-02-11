import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, User, ChevronRight } from "lucide-react"
import { getPostBySlug, getRelatedPosts, getProductById, getPosts } from "@/lib/data"
import { PostContent } from "@/components/blog/post-content"
import { ProductCard } from "@/components/blog/product-card"
import { FaqSection } from "@/components/blog/faq-section"
import { RelatedPosts } from "@/components/blog/related-posts"

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts
    .filter((p) => p.status === "published")
    .map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    openGraph: {
      title: post.seo.ogTitle || post.seo.title || post.title,
      description: post.seo.ogDescription || post.seo.description || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.seo.ogImage
        ? [post.seo.ogImage]
        : [post.featuredImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.ogTitle || post.title,
      description: post.seo.ogDescription || post.excerpt,
    },
    alternates: {
      canonical: post.seo.canonical || `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const [relatedPosts, productData] = await Promise.all([
    getRelatedPosts(post.slug, post.categorySlug),
    Promise.all(
      post.productBlocks.map((block) => getProductById(block.productId))
    ).then((arr) => arr.filter(Boolean)),
  ])

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Click craze" },
  }

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `/category/${post.categorySlug}`,
      },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 lg:px-6 lg:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/category/${post.categorySlug}`} className="hover:text-primary">
            {post.category}
          </Link>
        </nav>

        <header className="mb-8">
          <span className="mb-3 inline-block rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {post.category}
          </span>
          <h1 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground lg:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </span>
          </div>
        </header>

        <div className="mb-8 overflow-hidden rounded-xl">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            width={900}
            height={500}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div className="prose-custom">
          <PostContent blocks={post.content} />
        </div>

        {productData.length > 0 && (
          <div className="mt-10 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Recommended Products
            </h2>
            {productData.map(
              (product) =>
                product && <ProductCard key={product.id} product={product} />
            )}
          </div>
        )}

        {post.faqs.length > 0 && (
          <div className="mt-10">
            <FaqSection faqs={post.faqs} />
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}
    </>
  )
}
