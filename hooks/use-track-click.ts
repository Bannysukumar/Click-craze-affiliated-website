"use client"

import { useCallback } from "react"

interface TrackClickParams {
  store: string
  postId?: string
  productId?: string
}

export function useTrackClick() {
  const trackClick = useCallback(
    async ({ store, postId, productId }: TrackClickParams) => {
      try {
        await fetch("/api/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            store,
            postId,
            productId,
            referrerPage: typeof window !== "undefined" ? window.location.pathname : "",
          }),
        })
      } catch {
        // Silently fail - don't block user navigation
      }
    },
    []
  )

  return { trackClick }
}
