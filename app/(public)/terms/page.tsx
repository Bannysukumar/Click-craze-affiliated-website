import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Click craze terms of service and conditions for using our website.",
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: February 2026</p>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          By using Click craze, you agree to these terms. Please read them carefully before using our website.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Use of Content</h2>
        <p>
          All content on this website, including text, images, and reviews, is protected by copyright. You may not reproduce, distribute, or modify our content without written permission.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Product Information</h2>
        <p>
          We strive to provide accurate product information and pricing. However, prices and availability change frequently. We are not responsible for any discrepancies between the information on our site and the retailer.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Affiliate Links</h2>
        <p>
          Our site contains affiliate links to third-party retailers. We are not responsible for the products, services, or policies of these external websites. Please review their terms before making a purchase.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Limitation of Liability</h2>
        <p>
          Click craze provides information on an &quot;as is&quot; basis. We make no warranties about the completeness, reliability, or accuracy of this information. Any action you take based on our content is at your own risk.
        </p>
      </div>
    </div>
  )
}
