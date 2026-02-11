import { getStores } from "@/lib/data"
import { AdminStoresClient } from "./admin-stores-client"

export default async function AdminStoresPage() {
  const stores = await getStores()
  return <AdminStoresClient stores={stores} />
}
