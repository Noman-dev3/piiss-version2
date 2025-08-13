import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { faqSection } from "@/lib/data";
  
export default function FaqSection() {
    return (
        <section id="faq" className="py-20 lg:py-32 px-6 lg:px-12 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <Badge
                        variant="outline"
                        className="mb-4 bg-secondary/80"
                        >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        {faqSection.badge}
                    </Badge>
                    <h2 className="text-4xl font-bold font-headline">{faqSection.title}</h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        {faqSection.description}
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqSection.faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                            {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                            {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
