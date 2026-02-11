"use server"

import { addCategory as addCategoryToFirestore } from "@/lib/firestore"
import type { Category, SEOData } from "@/lib/types"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export async function addCategoryAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = (formData.get("name") as string)?.trim()
    const slug = (formData.get("slug") as string)?.trim() || slugify(name || "")
    const description = (formData.get("description") as string)?.trim() || ""
    const image = (formData.get("image") as string)?.trim() || "/placeholder.svg"

    if (!name) {
      return { ok: false, error: "Category name is required." }
    }

    const seo: SEOData = {
      title: name,
      description: description || name,
    }

    const category: Omit<Category, "id"> = {
      name,
      slug,
      description,
      image,
      postCount: 0,
      seo,
    }

    await addCategoryToFirestore(category)
    return { ok: true }
  } catch (e) {
    console.error("addCategoryAction", e)
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to add category.",
    }
  }
}
