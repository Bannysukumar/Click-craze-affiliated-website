import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Our affiliate disclosure explains how we earn commissions and maintain editorial independence.",
}

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
        Affiliate Disclosure
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Click craze is a participant in various affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to retailers.
        </p>
        <p>
          When you click on a product link on our site and make a purchase, we may receive a small commission at no extra cost to you. This helps us keep the site running and continue to provide free, high-quality content.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Our Promise</h2>
        <p>
          Affiliate commissions never influence our product recommendations. We test and review products based on their merits, regardless of whether we earn a commission. Our editorial team operates independently from our business partnerships.
        </p>
        <p>
          We clearly mark affiliate links so you always know when a link may result in a commission for us. Your trust is our most important asset.
        </p>
      </div>
    </div>
  )
}
