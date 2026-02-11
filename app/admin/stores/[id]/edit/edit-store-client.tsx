"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Store } from "@/lib/types"
import { updateStoreAction } from "../../actions"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function EditStoreClient({ store }: { store: Store }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(store.name)
  const [slug, setSlug] = useState(store.slug)
  const [description, setDescription] = useState(store.description)
  const [logo, setLogo] = useState(store.logo)
  const [affiliateBaseUrl, setAffiliateBaseUrl] = useState(store.affiliateBaseUrl)
  const [linkTemplate, setLinkTemplate] = useState(store.linkTemplate)
  const [defaultCTA, setDefaultCTA] = useState(store.defaultCTA)

  function handleNameChange(value: string) {
    setName(value)
    setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const formData = new FormData(e.currentTarget)
    const result = await updateStoreAction(store.id, formData)
    setPending(false)
    if (result.ok) {
      router.push("/admin/stores")
      router.refresh()
    } else {
      setError(result.error ?? "Something went wrong.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/stores">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Edit Store
            </h1>
            <p className="text-sm text-muted-foreground">
              Update {store.name}. Changes are saved to Firebase.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="max-w-xl">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Amazon"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="amazon"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                name="logo"
                placeholder="https://... or /placeholder.svg"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliateBaseUrl">Affiliate base URL</Label>
              <Input
                id="affiliateBaseUrl"
                name="affiliateBaseUrl"
                placeholder="https://..."
                value={affiliateBaseUrl}
                onChange={(e) => setAffiliateBaseUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkTemplate">Link template (e.g. {'{url}'} for product URL)</Label>
              <Input
                id="linkTemplate"
                name="linkTemplate"
                placeholder="https://store.com/ref=xxx?url={url}"
                value={linkTemplate}
                onChange={(e) => setLinkTemplate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultCTA">Default button text</Label>
              <Input
                id="defaultCTA"
                name="defaultCTA"
                placeholder="Buy now"
                value={defaultCTA}
                onChange={(e) => setDefaultCTA(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex gap-2">
              <Button
                type="submit"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={pending}
              >
                <Save className="h-4 w-4" />
                {pending ? "Saving…" : "Save changes"}
              </Button>
              <Link href="/admin/stores">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
