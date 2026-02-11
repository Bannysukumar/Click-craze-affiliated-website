import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Click craze team. We would love to hear from you.",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Have a question, suggestion, or want to work with us? Fill out the form below and we will get back to you.
      </p>
      <ContactForm />
    </div>
  )
}
