import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Click craze privacy policy - how we collect, use, and protect your information.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: February 2026</p>
      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="font-serif text-xl font-bold text-foreground">Information We Collect</h2>
        <p>
          We collect information you provide directly, such as when you fill out a contact form or subscribe to our newsletter. We also collect certain information automatically, including your IP address, browser type, and pages visited.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">How We Use Your Information</h2>
        <p>
          We use your information to operate and improve our website, respond to your inquiries, send newsletters (if subscribed), and analyze site traffic. We use analytics tools to understand how visitors interact with our site.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Affiliate Links & Cookies</h2>
        <p>
          Our site contains affiliate links. When you click these links, cookies may be placed on your device by third-party retailers to track referrals. We also use our own cookies for basic site functionality and analytics.
        </p>
        <h2 className="font-serif text-xl font-bold text-foreground">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can also opt out of cookies and tracking through your browser settings. Contact us for any privacy-related requests.
        </p>
      </div>
    </div>
  )
}
