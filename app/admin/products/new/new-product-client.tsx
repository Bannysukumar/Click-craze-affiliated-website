"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category, Store } from "@/lib/types"
import { addProductAction, fetchImageFromUrlAction } from "../actions"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function NewProductClient({
  categories = [],
  stores = [],
}: {
  categories: Category[]
  stores: Store[]
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [rating, setRating] = useState("5")
  const [store, setStore] = useState("")
  const [affiliateUrl, setAffiliateUrl] = useState("")
  const [buttonText, setButtonText] = useState("Buy now")
  const [price, setPrice] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [fetchImagePending, setFetchImagePending] = useState(false)
  const [fetchImageError, setFetchImageError] = useState<string | null>(null)

  async function handleFetchImage() {
    if (!affiliateUrl.trim()) return
    setFetchImageError(null)
    setFetchImagePending(true)
    const result = await fetchImageFromUrlAction(affiliateUrl)
    setFetchImagePending(false)
    if (result.ok && result.imageUrl) {
      setImage(result.imageUrl)
    } else {
      setFetchImageError(result.error ?? "Could not fetch image.")
    }
  }

  function handleNameChange(value: string) {
    setName(value)
    setSlug(slugify(value))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const formData = new FormData(e.currentTarget)
    const result = await addProductAction(formData)
    setPending(false)
    if (result.ok) {
      router.push("/admin/products")
      router.refresh()
    } else {
      setError(result.error ?? "Something went wrong.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Add Product
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a new product. It will be saved to Firebase.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Basic info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Wireless Earbuds Pro"
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
                    placeholder="wireless-earbuds-pro"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    placeholder="https://... or /placeholder.svg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  {image && image !== "/placeholder.svg" && (
                    <div className="relative mt-2 aspect-square w-24 overflow-hidden rounded-md border bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt="Product preview"
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short description</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    placeholder="Brief description of the product..."
                    rows={3}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category || "uncategorized"}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="uncategorized">
                        Uncategorized
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    name="category"
                    value={category || "uncategorized"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0–5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Affiliate & price</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store">Store</Label>
                  <Select value={store} onValueChange={setStore}>
                    <SelectTrigger id="store">
                      <SelectValue placeholder="Select store" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores.map((s) => (
                        <SelectItem key={s.id} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="store" value={store} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliateUrl">Affiliate URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="affiliateUrl"
                      name="affiliateUrl"
                      type="url"
                      placeholder="https://..."
                      value={affiliateUrl}
                      onChange={(e) => {
                        setAffiliateUrl(e.target.value)
                        setFetchImageError(null)
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleFetchImage}
                      disabled={!affiliateUrl.trim() || fetchImagePending}
                      className="shrink-0 gap-1.5"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
                      {fetchImagePending ? "Fetching…" : "Fetch image"}
                    </Button>
                  </div>
                  {fetchImageError && (
                    <p className="text-xs text-destructive">{fetchImageError}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Paste the product page URL above, then click &quot;Fetch image&quot; to use its image in Image URL.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button text</Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    placeholder="Buy now"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="₹999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original price (optional)</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    placeholder="₹1,299"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

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
                {pending ? "Saving…" : "Save product"}
              </Button>
              <Link href="/admin/products">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
