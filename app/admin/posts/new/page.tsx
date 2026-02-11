import { getCategories } from "@/lib/data"
import { NewPostClient } from "./new-post-client"

export default async function NewPostPage() {
  const categories = await getCategories()
  return <NewPostClient categories={categories} />
}
