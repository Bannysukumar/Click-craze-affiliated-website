import Link from "next/link"
import type { Category, SiteSettings } from "@/lib/types"

const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Stores", href: "/stores" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/disclosure" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  content: [
    { label: "Blog", href: "/blog" },
    { label: "Deals", href: "/deals" },
  ],
}

export function SiteFooter({
  categories = [],
  siteSettings,
}: {
  categories?: Category[]
  siteSettings?: SiteSettings
}) {
  const name = siteSettings?.siteName ?? "Click craze"
  const footerText = siteSettings?.footerText ?? "Your trusted source for deals and reviews."
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                CC
              </span>
              <span className="font-serif text-lg font-bold text-foreground">
                {name}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footerText}
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Categories</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {(categories ?? []).slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Content */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {[...footerLinks.content, ...footerLinks.company].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Prices and availability are subject to change. We may earn a commission from affiliate links.
          </p>
        </div>
      </div>
    </footer>
  )
}
