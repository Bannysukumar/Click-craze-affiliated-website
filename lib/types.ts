export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: ContentBlock[]
  category: string
  categorySlug: string
  tags: string[]
  featuredImage: string
  author: string
  authorAvatar: string
  publishedAt: string
  readTime: number
  status: "draft" | "published" | "scheduled"
  seo: SEOData
  faqs: FAQ[]
  productBlocks: ProductBlock[]
  viewCount: number
}

export interface ContentBlock {
  type: "paragraph" | "heading" | "image" | "quote" | "pros-cons" | "product" | "faq"
  data: Record<string, unknown>
}

export interface ProductBlock {
  productId: string
  position: number
}

export interface Product {
  id: string
  name: string
  slug: string
  image: string
  category: string
  categorySlug: string
  shortDescription: string
  specs: { key: string; value: string }[]
  rating: number
  affiliateLinks: AffiliateLink[]
  prices: { store: string; price: string; originalPrice?: string }[]
  whyBuy: string[]
  alternatives: string[]
  faqs: FAQ[]
  seo: SEOData
}

export interface AffiliateLink {
  store: string
  storeSlug: string
  url: string
  buttonText: string
}

export interface Deal {
  id: string
  title: string
  store: string
  storeSlug: string
  link: string
  couponCode?: string
  expiryDate: string
  highlight: "hot" | "trending" | "new" | "verified" | null
  image: string
  originalPrice: string
  dealPrice: string
  discount: string
  isActive: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  postCount: number
  seo: SEOData
}

export interface Store {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  affiliateBaseUrl: string
  linkTemplate: string
  defaultCTA: string
  postCount: number
  productCount: number
}

export interface FAQ {
  question: string
  answer: string
}

export interface SEOData {
  title: string
  description: string
  focusKeyword?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

export interface SiteSettings {
  siteName: string
  tagline: string
  defaultMetaDescription: string
  defaultOgImage: string
  logo: string
  favicon: string
  socialLinks: { platform: string; url: string }[]
  footerText: string
  contactEmail: string
  analyticsId?: string
  searchConsoleCode?: string
}

export interface ClickEvent {
  id: string
  storeName: string
  postId?: string
  productId?: string
  timestamp: string
  referrerPage: string
  userAgent: string
}
