
"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";
import { faqSection } from "@/lib/data";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { FAQ, faqSchema } from "@/app/admin/faq/data/schema";
import { z } from "zod";
import { useState, useEffect } from "react";
  
export default function FaqSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dbRef = ref(db, 'faqs');
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const itemsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                const parsedItems = z.array(faqSchema).safeParse(itemsArray);
                if (parsedItems.success) {
                    setFaqs(parsedItems.data);
                }
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching FAQs:", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

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
                {loading ? (
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                    </div>
                ) : faqs.length > 0 && (
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
                )}
            </div>
        </section>
    );
}
