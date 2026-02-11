import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Click craze - your trusted source for product reviews, deals, and money-saving tips.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
        About Click craze
      </h1>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Click craze is your trusted destination for honest product reviews, curated deals, and money-saving tips. We believe everyone deserves access to reliable information before making a purchase.
        </p>
        <p>
          Our team of experienced reviewers spends hundreds of hours testing products across every category - from electronics and home appliances to software and fashion. We buy the products ourselves and put them through rigorous real-world testing.
        </p>
        <h2 className="font-serif text-2xl font-bold text-foreground">Our Mission</h2>
        <p>
          We help you make informed purchasing decisions by providing unbiased reviews, comparing prices across retailers, and highlighting the best deals available. Our recommendations are based on hands-on testing, not paid placements.
        </p>
        <h2 className="font-serif text-2xl font-bold text-foreground">How We Work</h2>
        <p>
          When you click on a link to a retailer on our site, we may earn a small commission. This is how we fund our testing and keep our content free. This never influences our reviews or recommendations - our editorial integrity is paramount.
        </p>
        <h2 className="font-serif text-2xl font-bold text-foreground">Our Team</h2>
        <p>
          Our team of writers and editors brings decades of combined experience in product journalism. Each review goes through a rigorous editorial process to ensure accuracy, fairness, and usefulness.
        </p>
      </div>
    </div>
  )
}
