import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
  
const faqs = [
    {
        question: "What are the school hours?",
        answer: "Our school hours are from 8:00 AM to 3:00 PM, Monday to Friday. The office is open until 5:00 PM.",
    },
    {
        question: "How can I apply for admission?",
        answer: "You can apply for admission through our online portal on the 'Admissions' page. You'll need to fill out the form and upload the required documents.",
    },
    {
        question: "What curriculum do you follow?",
        answer: "We follow a modern curriculum that blends national standards with international best practices, focusing on holistic development.",
    },
    {
        question: "Do you offer extracurricular activities?",
        answer: "Yes, we offer a wide range of extracurricular activities, including sports, arts, debate, and science clubs to ensure the all-round development of our students.",
    },
];

export default function FaqSection() {
    return (
        <section id="faq" className="py-20 lg:py-32 px-6 lg:px-12 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                     <Badge
                        variant="outline"
                        className="mb-4 bg-secondary/80 border-white/20"
                        >
                        <HelpCircle className="w-4 h-4 mr-2" />
                        FAQ
                    </Badge>
                    <h2 className="text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Find answers to common questions about our school, admissions, and programs.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
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
