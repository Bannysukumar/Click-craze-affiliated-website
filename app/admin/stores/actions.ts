"use server"

import { addStore as addStoreToFirestore, updateStore as updateStoreInFirestore, deleteStore as deleteStoreFromFirestore } from "@/lib/firestore"
import type { Store } from "@/lib/types"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function addStoreAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = (formData.get("name") as string)?.trim()
    const slug = (formData.get("slug") as string)?.trim() || slugify(name || "")
    const description = (formData.get("description") as string)?.trim() || ""
    const logo = (formData.get("logo") as string)?.trim() || "/placeholder.svg"
    const affiliateBaseUrl = (formData.get("affiliateBaseUrl") as string)?.trim() || ""
    const linkTemplate = (formData.get("linkTemplate") as string)?.trim() || ""
    const defaultCTA = (formData.get("defaultCTA") as string)?.trim() || "Buy now"

    if (!name) {
      return { ok: false, error: "Store name is required." }
    }

    const store: Omit<Store, "id"> = {
      name,
      slug,
      logo,
      description,
      affiliateBaseUrl,
      linkTemplate,
      defaultCTA,
      postCount: 0,
      productCount: 0,
    }

    await addStoreToFirestore(store)
    return { ok: true }
  } catch (e) {
    console.error("addStoreAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to add store.",
    }
  }
}

export async function updateStoreAction(
  id: string,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = (formData.get("name") as string)?.trim()
    const slug = (formData.get("slug") as string)?.trim() || slugify(name || "")
    const description = (formData.get("description") as string)?.trim() || ""
    const logo = (formData.get("logo") as string)?.trim() || "/placeholder.svg"
    const affiliateBaseUrl = (formData.get("affiliateBaseUrl") as string)?.trim() || ""
    const linkTemplate = (formData.get("linkTemplate") as string)?.trim() || ""
    const defaultCTA = (formData.get("defaultCTA") as string)?.trim() || "Buy now"

    if (!name) {
      return { ok: false, error: "Store name is required." }
    }

    await updateStoreInFirestore(id, {
      name,
      slug,
      logo,
      description,
      affiliateBaseUrl,
      linkTemplate,
      defaultCTA,
    })
    return { ok: true }
  } catch (e) {
    console.error("updateStoreAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to update store.",
    }
  }
}

export async function deleteStoreAction(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await deleteStoreFromFirestore(id)
    return { ok: true }
  } catch (e) {
    console.error("deleteStoreAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to delete store.",
    }
  }
}
