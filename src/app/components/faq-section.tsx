

"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Send, Sparkles } from "lucide-react";
import { faqSection } from "@/lib/data";
import { FAQ } from "@/app/admin/data-schemas";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { askAI } from "@/ai/flows/ask-ai-flow";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
  
interface FaqSectionProps {
  faqs: FAQ[];
  settings: Record<string, any>;
}

export default function FaqSection({ faqs, settings }: FaqSectionProps) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        setAnswer("");

        try {
            const aiResponse = await askAI({
                question,
                faqs,
                settings,
            });
            setAnswer(aiResponse);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            toast({
                title: "Error",
                description: "There was an issue with the AI assistant. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }

    }

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
                   <Card className="bg-secondary/50 p-6 rounded-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                        <Input
                            type="text"
                            placeholder="Ask anything about our school..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="bg-background flex-1 h-12 text-base"
                            disabled={loading}
                        />
                        <Button type="submit" size="lg" disabled={loading}>
                           <Send className="w-4 h-4 mr-2" />
                           {loading ? "Thinking..." : "Ask"}
                        </Button>
                    </form>
                   </Card>

                   {loading && (
                    <Card className="mt-6 bg-secondary/50 p-6 rounded-lg">
                        <div className="flex items-start space-x-4">
                            <div className="bg-primary/20 p-2 rounded-full">
                                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    </Card>
                   )}

                   {answer && !loading && (
                     <Card className="mt-6 bg-secondary/50 p-6 rounded-lg animate-in fade-in-50">
                        <div className="flex items-start space-x-4">
                             <div className="bg-primary/20 p-2 rounded-full">
                                <Sparkles className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Answer:</h3>
                                <p className="text-muted-foreground whitespace-pre-wrap">{answer}</p>
                            </div>
                        </div>
                    </Card>
                   )}

                </div>
            </div>
        </section>
    );
}
