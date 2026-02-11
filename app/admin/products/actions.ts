"use server"

import {
  addProduct as addProductToFirestore,
  updateProduct as updateProductInFirestore,
  deleteProduct as deleteProductFromFirestore,
} from "@/lib/firestore"
import type { Product, AffiliateLink, SEOData } from "@/lib/types"

/**
 * Fetches the page at the given URL and extracts og:image or twitter:image meta tag.
 * Returns the absolute image URL for use as product image.
 */
export async function fetchImageFromUrlAction(
  url: string
): Promise<{ ok: boolean; imageUrl?: string; error?: string }> {
  const trimmed = (url || "").trim()
  if (!trimmed) {
    return { ok: false, error: "URL is required." }
  }
  try {
    const parsed = new URL(trimmed)
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { ok: false, error: "URL must be http or https." }
    }
  } catch {
    return { ok: false, error: "Invalid URL." }
  }

  try {
    const res = await fetch(trimmed, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; AffiliateBot/1.0; +https://example.com)",
      },
      next: { revalidate: 0 },
    })
    if (!res.ok) {
      return { ok: false, error: `Page returned ${res.status}.` }
    }
    const html = await res.text()
    const baseUrl = new URL(trimmed).origin

    // og:image (content before or after property)
    const ogMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)
    if (ogMatch?.[1]) {
      const src = ogMatch[1].trim()
      const absolute = src.startsWith("http") ? src : new URL(src, baseUrl).href
      return { ok: true, imageUrl: absolute }
    }

    // twitter:image
    const twMatch =
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)
    if (twMatch?.[1]) {
      const src = twMatch[1].trim()
      const absolute = src.startsWith("http") ? src : new URL(src, baseUrl).href
      return { ok: true, imageUrl: absolute }
    }

    return { ok: false, error: "No product image (og:image or twitter:image) found on the page." }
  } catch (e) {
    console.error("fetchImageFromUrlAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to fetch the page.",
    }
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function addProductAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = (formData.get("name") as string)?.trim()
    const slug = (formData.get("slug") as string)?.trim() || slugify(name || "")
    const image = (formData.get("image") as string)?.trim() || "/placeholder.svg"
    const category = (formData.get("category") as string)?.trim() || "Uncategorized"
    const categorySlug = slugify(category)
    const shortDescription = (formData.get("shortDescription") as string)?.trim() || ""
    const rating = Number(formData.get("rating")) || 5
    const store = (formData.get("store") as string)?.trim()
    const storeSlug = slugify(store || "")
    const url = (formData.get("affiliateUrl") as string)?.trim() || "#"
    const buttonText = (formData.get("buttonText") as string)?.trim() || "Buy now"
    const price = (formData.get("price") as string)?.trim() || ""
    const originalPriceRaw = (formData.get("originalPrice") as string)?.trim()

    if (!name) {
      return { ok: false, error: "Product name is required." }
    }

    const affiliateLinks: AffiliateLink[] = store
      ? [{ store, storeSlug, url, buttonText }]
      : []
    const prices = price
      ? [
          {
            store: store || "Default",
            price,
            ...(originalPriceRaw ? { originalPrice: originalPriceRaw } : {}),
          },
        ]
      : []

    const seo: SEOData = {
      title: name,
      description: shortDescription || name,
    }

    const product: Omit<Product, "id"> = {
      name,
      slug,
      image,
      category,
      categorySlug,
      shortDescription,
      specs: [],
      rating: Math.min(5, Math.max(0, rating)),
      affiliateLinks,
      prices,
      whyBuy: [],
      alternatives: [],
      faqs: [],
      seo,
    }

    // Firestore does not allow undefined values; remove any
    const productForFirestore = JSON.parse(JSON.stringify(product)) as Omit<Product, "id">
    await addProductToFirestore(productForFirestore)
    return { ok: true }
  } catch (e) {
    console.error("addProductAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to add product.",
    }
  }
}

export async function updateProductAction(
  id: string,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = (formData.get("name") as string)?.trim()
    const slug = (formData.get("slug") as string)?.trim() || slugify(name || "")
    const image = (formData.get("image") as string)?.trim() || "/placeholder.svg"
    const category = (formData.get("category") as string)?.trim() || "Uncategorized"
    const categorySlug = slugify(category)
    const shortDescription = (formData.get("shortDescription") as string)?.trim() || ""
    const rating = Number(formData.get("rating")) || 5
    const store = (formData.get("store") as string)?.trim()
    const storeSlug = slugify(store || "")
    const url = (formData.get("affiliateUrl") as string)?.trim() || "#"
    const buttonText = (formData.get("buttonText") as string)?.trim() || "Buy now"
    const price = (formData.get("price") as string)?.trim() || ""
    const originalPriceRaw = (formData.get("originalPrice") as string)?.trim()

    if (!name) {
      return { ok: false, error: "Product name is required." }
    }

    const affiliateLinks: AffiliateLink[] = store
      ? [{ store, storeSlug, url, buttonText }]
      : []
    const prices = price
      ? [
          {
            store: store || "Default",
            price,
            ...(originalPriceRaw ? { originalPrice: originalPriceRaw } : {}),
          },
        ]
      : []

    const seo: SEOData = {
      title: name,
      description: shortDescription || name,
    }

    const data: Partial<Omit<Product, "id">> = {
      name,
      slug,
      image,
      category,
      categorySlug,
      shortDescription,
      rating: Math.min(5, Math.max(0, rating)),
      affiliateLinks,
      prices,
      seo,
    }
    const dataForFirestore = JSON.parse(JSON.stringify(data)) as Partial<Omit<Product, "id">>
    await updateProductInFirestore(id, dataForFirestore)
    return { ok: true }
  } catch (e) {
    console.error("updateProductAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to update product.",
    }
  }
}

export async function deleteProductAction(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await deleteProductFromFirestore(id)
    return { ok: true }
  } catch (e) {
    console.error("deleteProductAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to delete product.",
    }
  }
}
