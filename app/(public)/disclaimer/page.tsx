import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers about product reviews, pricing, and affiliate relationships on Click craze.",
}

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
        Disclaimer
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          The information on Click craze is for general informational purposes only. While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the information.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Product Reviews</h2>
        <p>
          Our product reviews are based on our independent testing and research. Individual experiences may vary. We recommend reading multiple reviews before making a purchase decision.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Pricing</h2>
        <p>
          Product prices and availability are subject to change at any time. The prices displayed on our site may not reflect the current price at the retailer. Always verify the final price on the retailer website before purchasing.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Affiliate Relationships</h2>
        <p>
          Click craze earns commissions from qualifying purchases made through affiliate links on our site. This does not affect the price you pay or our editorial integrity. See our full Affiliate Disclosure for more details.
        </p>
      </div>
    </div>
  )
}
