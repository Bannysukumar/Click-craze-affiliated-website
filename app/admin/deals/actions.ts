"use server"

import { addDeal as addDealToFirestore } from "@/lib/firestore"
import type { Deal } from "@/lib/types"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function addDealAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const title = (formData.get("title") as string)?.trim()
    const store = (formData.get("store") as string)?.trim() || ""
    const storeSlug = slugify(store)
    const link = (formData.get("link") as string)?.trim() || "#"
    const couponCode = (formData.get("couponCode") as string)?.trim() || undefined
    const expiryDate = (formData.get("expiryDate") as string)?.trim() || new Date().toISOString().slice(0, 10)
    const highlightRaw = (formData.get("highlight") as string)?.trim()
const highlight = highlightRaw && ["hot", "trending", "new", "verified"].includes(highlightRaw) ? highlightRaw as Deal["highlight"] : null
    const image = (formData.get("image") as string)?.trim() || "/placeholder.svg"
    const originalPrice = (formData.get("originalPrice") as string)?.trim() || ""
    const dealPrice = (formData.get("dealPrice") as string)?.trim() || ""
    const discount = (formData.get("discount") as string)?.trim() || ""
    const isActive = formData.get("isActive") === "on" || formData.get("isActive") === "true"

    if (!title) {
      return { ok: false, error: "Deal title is required." }
    }

    const deal: Omit<Deal, "id"> = {
      title,
      store,
      storeSlug,
      link,
      couponCode,
      expiryDate,
      highlight,
      image,
      originalPrice,
      dealPrice,
      discount,
      isActive,
    }

    await addDealToFirestore(deal)
    return { ok: true }
  } catch (e) {
    console.error("addDealAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to add deal.",
    }
  }
}
