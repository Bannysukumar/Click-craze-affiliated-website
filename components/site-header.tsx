"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category, SiteSettings } from "@/lib/types"

const navLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Deals", href: "/deals" },
  { label: "Stores", href: "/stores" },
]

export function SiteHeader({
  categories = [],
  siteSettings,
}: {
  categories?: Category[]
  siteSettings?: SiteSettings
}) {
  const siteName = siteSettings?.siteName ?? "Click craze"
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src={siteSettings?.logo ?? "/logo.png"}
            alt={siteName}
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {categoriesOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCategoriesOpen(false)}
                  onKeyDown={(e) => e.key === "Escape" && setCategoriesOpen(false)}
                  role="button"
                  tabIndex={-1}
                  aria-label="Close categories dropdown"
                />
                <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-border bg-card p-2 shadow-lg">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link href="/blog" aria-label="Search">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-border pt-2">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
