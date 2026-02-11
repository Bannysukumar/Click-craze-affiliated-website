import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  type DocumentData,
} from "firebase/firestore"
import { db } from "./firebase"
import type {
  Post,
  Product,
  Deal,
  Category,
  Store,
  SiteSettings,
  ClickEvent,
} from "./types"

const COLLECTIONS = {
  siteSettings: "siteSettings",
  categories: "categories",
  stores: "stores",
  products: "products",
  posts: "posts",
  deals: "deals",
  clicks: "clicks",
} as const

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "Click craze",
  tagline: "Deals, reviews & coupons you'll love",
  defaultMetaDescription: "Discover the best deals and product reviews.",
  defaultOgImage: "/og-default.jpg",
  logo: "/logo.svg",
  favicon: "/favicon.ico",
  socialLinks: [],
  footerText: "Your trusted source for deals and reviews.",
  contactEmail: "",
  analyticsId: undefined,
}

function mapTimestamps<T extends Record<string, unknown>>(obj: T): T {
  const out = { ...obj }
  for (const key of Object.keys(out)) {
    const v = out[key]
    if (v && typeof v === "object" && "toDate" in v && typeof (v as { toDate: () => Date }).toDate === "function") {
      ;(out as Record<string, unknown>)[key] = (v as { toDate: () => Date }).toDate().toISOString()
    }
  }
  return out
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const ref = doc(db, COLLECTIONS.siteSettings, "main")
    const snap = await getDoc(ref)
    if (!snap.exists()) return DEFAULT_SITE_SETTINGS
    const data = mapTimestamps(snap.data() as DocumentData) as SiteSettings
    return { ...DEFAULT_SITE_SETTINGS, ...data }
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.categories))
    return snap.docs.map((d) => {
      const data = mapTimestamps({ ...d.data(), id: d.id }) as Category & { id: string }
      return { ...data, id: data.id || d.id }
    })
  } catch {
    return []
  }
}

export async function getStores(): Promise<Store[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.stores))
    return snap.docs.map((d) => {
      const data = mapTimestamps({ ...d.data(), id: d.id }) as Store & { id: string }
      return { ...data, id: data.id || d.id }
    })
  } catch {
    return []
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.products))
    return snap.docs.map((d) => {
      const data = mapTimestamps({ ...d.data(), id: d.id }) as Product & { id: string }
      return { ...data, id: data.id || d.id }
    })
  } catch {
    return []
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.posts))
    const list = snap.docs.map((d) => {
      const data = mapTimestamps({ ...d.data(), id: d.id }) as Post & { id: string }
      return { ...data, id: data.id || d.id }
    })
    return list.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch {
    return []
  }
}

export async function getDeals(): Promise<Deal[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.deals))
    return snap.docs.map((d) => {
      const data = mapTimestamps({ ...d.data(), id: d.id }) as Deal & { id: string }
      return { ...data, id: data.id || d.id }
    })
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts()
  return posts.find((p) => p.slug === slug && p.status === "published")
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await getPosts()
  return posts.filter(
    (p) => p.categorySlug === categorySlug && p.status === "published"
  )
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find((c) => c.slug === slug)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.slug === slug)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getStoreBySlug(slug: string): Promise<Store | undefined> {
  const stores = await getStores()
  return stores.find((s) => s.slug === slug)
}

export async function getStoreById(id: string): Promise<Store | undefined> {
  try {
    const ref = doc(db, COLLECTIONS.stores, id)
    const snap = await getDoc(ref)
    if (!snap.exists()) return undefined
    const data = mapTimestamps({ ...snap.data(), id: snap.id }) as Store & { id: string }
    return { ...data, id: data.id || snap.id }
  } catch {
    return undefined
  }
}

export async function updateStore(
  id: string,
  data: Partial<Omit<Store, "id">>
): Promise<void> {
  const ref = doc(db, COLLECTIONS.stores, id)
  await updateDoc(ref, data)
}

export async function deleteStore(id: string): Promise<void> {
  const ref = doc(db, COLLECTIONS.stores, id)
  await deleteDoc(ref)
}

export async function getDealsByStore(storeSlug: string): Promise<Deal[]> {
  const deals = await getDeals()
  return deals.filter((d) => d.storeSlug === storeSlug && d.isActive)
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getPosts()
  return posts
    .filter((p) => p.status === "published")
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const published = await getPublishedPosts()
  return published.slice(0, 3)
}

export async function getRelatedPosts(
  currentSlug: string,
  categorySlug: string
): Promise<Post[]> {
  const posts = await getPublishedPosts()
  return posts
    .filter((p) => p.slug !== currentSlug && p.categorySlug === categorySlug)
    .slice(0, 3)
}

export async function getActiveDeals(): Promise<Deal[]> {
  const deals = await getDeals()
  return deals.filter((d) => d.isActive)
}

export async function recordClick(click: Omit<ClickEvent, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.clicks), {
    ...click,
    timestamp: new Date().toISOString(),
  })
  return ref.id
}

export async function addProduct(
  product: Omit<Product, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.products), product)
  return ref.id
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id">>
): Promise<void> {
  const ref = doc(db, COLLECTIONS.products, id)
  await updateDoc(ref, data)
}

export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(db, COLLECTIONS.products, id)
  await deleteDoc(ref)
}

export async function addCategory(
  category: Omit<Category, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.categories), category)
  return ref.id
}

export async function addStore(store: Omit<Store, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.stores), store)
  return ref.id
}

export async function addDeal(deal: Omit<Deal, "id">): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.deals), deal)
  return ref.id
}
