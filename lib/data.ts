/**
 * Data layer: all content comes from Firebase Firestore.
 * No demo/static data – empty collections show empty UI.
 */
export {
  getSiteSettings,
  getCategories,
  getStores,
  getProducts,
  getPosts,
  getDeals,
  getPostBySlug,
  getPostsByCategory,
  getCategoryBySlug,
  getProductBySlug,
  getProductById,
  getStoreBySlug,
  getDealsByStore,
  getPublishedPosts,
  getFeaturedPosts,
  getRelatedPosts,
  getActiveDeals,
  recordClick,
} from "./firestore"

export type {
  Post,
  Product,
  Deal,
  Category,
  Store,
  SiteSettings,
  ContentBlock,
  ProductBlock,
  AffiliateLink,
  FAQ,
  SEOData,
  ClickEvent,
} from "./types"
