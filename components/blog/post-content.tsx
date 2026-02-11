import { Check, X } from "lucide-react"
import type { ContentBlock } from "@/lib/types"

export function PostContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `block-${index}`

        switch (block.type) {
          case "paragraph":
            return (
              <p key={key} className="text-base leading-relaxed text-foreground/80">
                {block.data.text as string}
              </p>
            )

          case "heading": {
            const level = (block.data.level as number) || 2
            const text = block.data.text as string
            if (level === 2) {
              return (
                <h2
                  key={key}
                  className="mt-8 font-serif text-2xl font-bold text-foreground"
                >
                  {text}
                </h2>
              )
            }
            return (
              <h3
                key={key}
                className="mt-6 font-serif text-xl font-bold text-foreground"
              >
                {text}
              </h3>
            )
          }

          case "pros-cons": {
            const pros = (block.data.pros as string[]) || []
            const cons = (block.data.cons as string[]) || []
            return (
              <div key={key} className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-800">
                    <Check className="h-5 w-5" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {pros.map((pro) => (
                      <li
                        key={pro}
                        className="flex items-start gap-2 text-sm text-green-700"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-800">
                    <X className="h-5 w-5" />
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {cons.map((con) => (
                      <li
                        key={con}
                        className="flex items-start gap-2 text-sm text-red-700"
                      >
                        <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          }

          case "quote":
            return (
              <blockquote
                key={key}
                className="border-l-4 border-primary pl-4 italic text-muted-foreground"
              >
                {block.data.text as string}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
