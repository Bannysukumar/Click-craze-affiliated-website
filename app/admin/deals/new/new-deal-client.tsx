"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Store } from "@/lib/types"
import { addDealAction } from "../actions"

export function NewDealClient({ stores = [] }: { stores: Store[] }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [store, setStore] = useState("")
  const [link, setLink] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [highlight, setHighlight] = useState<string>("none")
  const [image, setImage] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [dealPrice, setDealPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [isActive, setIsActive] = useState(true)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const formData = new FormData(e.currentTarget)
    formData.set("isActive", isActive ? "true" : "false")
    const result = await addDealAction(formData)
    setPending(false)
    if (result.ok) {
      router.push("/admin/deals")
      router.refresh()
    } else {
      setError(result.error ?? "Something went wrong.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/deals">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Add Deal
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a new deal or offer. It will be saved to Firebase.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Deal title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. 50% off on Electronics"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
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
                  <Label htmlFor="link">Deal link</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="couponCode">Coupon code (optional)</Label>
                  <Input
                    id="couponCode"
                    name="couponCode"
                    placeholder="SAVE50"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highlight">Highlight badge</Label>
                  <Select value={highlight || "none"} onValueChange={setHighlight}>
                    <SelectTrigger id="highlight">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="highlight" value={highlight === "none" ? "" : highlight} />
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
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Price & status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original price</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    placeholder="₹1,999"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealPrice">Deal price</Label>
                  <Input
                    id="dealPrice"
                    name="dealPrice"
                    placeholder="₹999"
                    value={dealPrice}
                    onChange={(e) => setDealPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount text</Label>
                  <Input
                    id="discount"
                    name="discount"
                    placeholder="50% off"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <Label htmlFor="isActive">Active (show on site)</Label>
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
                {pending ? "Saving…" : "Save deal"}
              </Button>
              <Link href="/admin/deals">
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
