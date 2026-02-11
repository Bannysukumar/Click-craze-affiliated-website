import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Source_Serif_4 } from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
})

export const metadata: Metadata = {
  title: {
    default: "Click craze - Best Deals, Reviews & Coupons",
    template: "%s | Click craze",
  },
  description:
    "Discover the best deals, in-depth product reviews, and exclusive coupons. Save money with our curated picks from top stores.",
  metadataBase: new URL("https://clickcraze.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Click craze",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#f07a1a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
