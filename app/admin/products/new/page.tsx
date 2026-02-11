import { getCategories, getStores } from "@/lib/data"
import { NewProductClient } from "./new-product-client"

export default async function NewProductPage() {
  const [categories, stores] = await Promise.all([
    getCategories(),
    getStores(),
  ])
  return (
    <NewProductClient categories={categories} stores={stores} />
  )
}
