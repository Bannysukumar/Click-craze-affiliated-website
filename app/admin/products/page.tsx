import { getProducts } from "@/lib/data"
import { AdminProductsClient } from "./admin-products-client"

export default async function AdminProductsPage() {
  const products = await getProducts()
  return <AdminProductsClient products={products} />
}
