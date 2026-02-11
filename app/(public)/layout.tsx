import React from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getSiteSettings, getCategories } from "@/lib/data"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [siteSettings, categories] = await Promise.all([
    getSiteSettings(),
    getCategories(),
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader categories={categories} siteSettings={siteSettings} />
      <main className="flex-1">{children}</main>
      <SiteFooter categories={categories} siteSettings={siteSettings} />
    </div>
  )
}
