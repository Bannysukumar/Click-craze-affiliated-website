import { redirect } from "next/navigation"
import { getProductById, getDeals } from "@/lib/data"

export default async function AffiliateRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [product, deals] = await Promise.all([
    getProductById(id),
    getDeals(),
  ])

  // Try product first (affiliate link to product page or external URL)
  if (product?.affiliateLinks?.[0]?.url) {
    return redirect(product.affiliateLinks[0].url)
  }
  if (product) {
    redirect(`/product/${product.slug}`)
  }

  // Try deal (redirect to deal link)
  const deal = deals.find((d) => d.id === id)
  if (deal?.link) {
    return redirect(deal.link)
  }
  if (deal) {
    redirect("/deals")
  }

  redirect("/")
}
