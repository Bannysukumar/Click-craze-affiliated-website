"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SiteSettings } from "@/lib/types"

export function AdminSettingsClient({ siteSettings }: { siteSettings: SiteSettings }) {
  const [siteName, setSiteName] = useState(siteSettings.siteName)
  const [tagline, setTagline] = useState(siteSettings.tagline)
  const [metaDesc, setMetaDesc] = useState(siteSettings.defaultMetaDescription)
  const [contactEmail, setContactEmail] = useState(siteSettings.contactEmail)
  const [analyticsId, setAnalyticsId] = useState(siteSettings.analyticsId || "")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure your site settings, SEO defaults, and integrations (from Firebase).
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO Defaults</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Site Information</CardTitle>
              <CardDescription>Basic settings for your affiliate blog.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Branding</CardTitle>
              <CardDescription>Upload your logo and favicon.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex aspect-[3/1] max-w-xs items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                  <p className="text-sm text-muted-foreground">Upload logo</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Favicon</Label>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                  <p className="text-xs text-muted-foreground">ICO</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Default SEO Settings</CardTitle>
              <CardDescription>
                These values are used when individual pages don&apos;t have custom SEO data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-desc">Default Meta Description</Label>
                <Textarea
                  id="meta-desc"
                  rows={3}
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">{metaDesc.length}/160 characters</p>
              </div>
              <div className="space-y-2">
                <Label>Default OG Image</Label>
                <div className="flex aspect-video max-w-sm items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                  <p className="text-sm text-muted-foreground">Upload OG image (1200x630)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Firebase</CardTitle>
              <CardDescription>
                Connect your Firebase project for authentication, database, and storage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-sm font-medium text-foreground">Connected</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your site is using Firebase for content (posts, products, deals, categories, stores, settings).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Google Analytics</CardTitle>
              <CardDescription>Track traffic and user behavior.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ga-id">Measurement ID</Label>
                <Input
                  id="ga-id"
                  placeholder="G-XXXXXXXXXX"
                  value={analyticsId}
                  onChange={(e) => setAnalyticsId(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Google Search Console</CardTitle>
              <CardDescription>Verify site ownership for search features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gsc-code">Verification Code</Label>
                <Input id="gsc-code" placeholder="Enter verification meta tag content" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
