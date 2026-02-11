import { getCategories } from "@/lib/data"
import { AdminCategoriesClient } from "./admin-categories-client"

export default async function AdminCategoriesPage() {
  const categories = await getCategories()
  return <AdminCategoriesClient categories={categories} />
}
