"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2, MoreHorizontal, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Store } from "@/lib/types"
import { deleteStoreAction } from "./actions"

export function AdminStoresClient({ stores = [] }: { stores: Store[] }) {
  const router = useRouter()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Stores</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage affiliate stores and link templates (from Firebase).
          </p>
        </div>
        <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/admin/stores/new">
            <Plus className="h-4 w-4" />
            Add Store
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {stores.length === 0 ? (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No stores yet. Add them in Firebase.</p>
        ) : (
          stores.map((store) => (
            <Card key={store.id}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold text-foreground">
                  {store.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{store.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {store.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/stores/${store.id}/edit`}>
                            <Edit2 className="mr-2 h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {store.affiliateBaseUrl ? (
                          <DropdownMenuItem asChild>
                            <a
                              href={store.affiliateBaseUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-3.5 w-3.5" />
                              Visit
                            </a>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem disabled>
                            <ExternalLink className="mr-2 h-3.5 w-3.5" />
                            Visit (no URL)
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onSelect={async () => {
                            if (confirm(`Delete "${store.name}"? This cannot be undone.`)) {
                              const res = await deleteStoreAction(store.id)
                              if (res.ok) router.refresh()
                              else alert(res.error)
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{store.postCount} posts</span>
                    <span>{store.productCount} products</span>
                  </div>
                  <p className="mt-2 truncate text-[10px] font-mono text-muted-foreground">
                    {store.linkTemplate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
