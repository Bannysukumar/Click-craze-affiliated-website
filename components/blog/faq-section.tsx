import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQ } from "@/lib/types"

export function FaqSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <div>
      <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
            <AccordionTrigger className="text-left font-medium text-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
