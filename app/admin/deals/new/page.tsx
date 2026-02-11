import { getStores } from "@/lib/data"
import { NewDealClient } from "./new-deal-client"

export default async function NewDealPage() {
  const stores = await getStores()
  return <NewDealClient stores={stores} />
}
