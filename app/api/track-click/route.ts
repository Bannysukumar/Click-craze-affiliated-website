import { NextResponse } from "next/server"
import { recordClick } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { store, postId, productId, referrerPage } = body

    const id = await recordClick({
      storeName: store || "unknown",
      postId: postId ?? undefined,
      productId: productId ?? undefined,
      timestamp: new Date().toISOString(),
      referrerPage: referrerPage || "",
      userAgent: request.headers.get("user-agent") || "",
    })

    return NextResponse.json({ success: true, id })
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
