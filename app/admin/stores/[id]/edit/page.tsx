import { getStoreById } from "@/lib/firestore"
import { notFound } from "next/navigation"
import { EditStoreClient } from "./edit-store-client"

export default async function EditStorePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const store = await getStoreById(id)
  if (!store) notFound()
  return <EditStoreClient store={store} />
}
