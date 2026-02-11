import { getDeals } from "@/lib/data"
import { AdminDealsClient } from "./admin-deals-client"

export default async function AdminDealsPage() {
  const deals = await getDeals()
  return <AdminDealsClient deals={deals} />
}
