import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-foreground">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Go Home
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="outline">Browse Blog</Button>
        </Link>
      </div>
    </div>
  )
}
