import { getProductById, getCategories, getStores } from "@/lib/data"
import { notFound } from "next/navigation"
import { EditProductClient } from "./edit-product-client"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, categories, stores] = await Promise.all([
    getProductById(id),
    getCategories(),
    getStores(),
  ])
  if (!product) notFound()
  return (
    <EditProductClient
      product={product}
      categories={categories}
      stores={stores}
    />
  )
}
