"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Save, Eye } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Category } from "@/lib/types"

export function NewPostClient({ categories = [] }: { categories: Category[] }) {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [status, setStatus] = useState("draft")
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [focusKeyword, setFocusKeyword] = useState("")

  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              New Post
            </h1>
            <p className="text-sm text-muted-foreground">
              Create a new blog post. Save to Firebase when ready.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter post title..."
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="post-url-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Write a brief summary..."
                      rows={3}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your post content here..."
                      rows={16}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supports Markdown. Add posts to Firebase to see them on the site.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.slug} value={cat.slug}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="tag1, tag2, tag3"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate tags with commas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag & drop
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Recommended: 1200x630px
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Search Engine Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  placeholder="Enter SEO title (max 60 chars)"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {seoTitle.length}/60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-desc">Meta Description</Label>
                <Textarea
                  id="seo-desc"
                  placeholder="Enter meta description (max 160 chars)"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">
                  {seoDescription.length}/160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="focus-kw">Focus Keyword</Label>
                <Input
                  id="focus-kw"
                  placeholder="e.g. best noise cancelling headphones"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-border p-4">
                <p className="text-xs text-muted-foreground">Search Preview</p>
                <div className="mt-2">
                  <p className="text-base font-medium text-blue-700 line-clamp-1">
                    {seoTitle || title || "Post Title"}
                  </p>
                  <p className="text-xs text-green-700">
                    yoursite.com/blog/{slug || "post-slug"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {seoDescription || excerpt || "Post description will appear here..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Canonical URL</Label>
                <Input placeholder="https://example.com/original-post" />
                <p className="text-xs text-muted-foreground">
                  Leave blank if this is the original content.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Product Blocks</Label>
                <p className="text-sm text-muted-foreground">
                  Attach product recommendations from Firebase to this post.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
