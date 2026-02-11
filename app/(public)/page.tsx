import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { DealsSection } from "@/components/home/deals-section"
import { LatestPostsSection } from "@/components/home/latest-posts-section"
import { BestPicksSection } from "@/components/home/best-picks-section"
import {
  getFeaturedPosts,
  getActiveDeals,
  getCategories,
  getProducts,
  getPublishedPosts,
} from "@/lib/data"

export default async function HomePage() {
  const [featuredPosts, activeDeals, categories, products, publishedPosts] =
    await Promise.all([
      getFeaturedPosts(),
      getActiveDeals(),
      getCategories(),
      getProducts(),
      getPublishedPosts(),
    ])

  return (
    <>
      <HeroSection featuredPosts={featuredPosts} />
      <CategoriesSection categories={categories} />
      <DealsSection deals={activeDeals} />
      <BestPicksSection products={products} />
      <LatestPostsSection posts={publishedPosts} />
    </>
  )
}
