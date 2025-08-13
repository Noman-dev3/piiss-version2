"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import { contactInfo, contactForm } from "@/lib/data";

export default function ContactSection() {
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);

    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message.
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (event.target as HTMLFormElement).reset();
  }
  
  return (
    <section id="contact" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-6 font-headline">{contactForm.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{contactForm.fields.firstName.label} *</Label>
                  <Input id="first-name" name="first-name" placeholder={contactForm.fields.firstName.placeholder} required className="bg-background/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{contactForm.fields.lastName.label} *</Label>
                  <Input id="last-name" name="last-name" placeholder={contactForm.fields.lastName.placeholder} required className="bg-background/80" />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="email">{contactForm.fields.email.label} *</Label>
                <Input id="email" name="email" type="email" placeholder={contactForm.fields.email.placeholder} required className="bg-background/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{contactForm.fields.phone.label}</Label>
                <Input id="phone" name="phone" placeholder={contactForm.fields.phone.placeholder} className="bg-background/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{contactForm.fields.subject.label} *</Label>
                <Select name="subject" required>
                  <SelectTrigger id="subject" className="bg-background/80">
                    <SelectValue placeholder={contactForm.fields.subject.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {contactForm.fields.subject.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{contactForm.fields.message.label} *</Label>
                <Textarea id="message" name="message" placeholder={contactForm.fields.message.placeholder} rows={5} required className="bg-background/80" />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                {contactForm.submitButton}
              </Button>
            </form>
          </div>
          <div className="flex flex-col">
             <h2 className="text-4xl font-bold mb-6 font-headline">{contactInfo.title}</h2>
              <div className="space-y-6">
                {contactInfo.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-background/80 rounded-full">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
             <Card className="overflow-hidden rounded-xl shadow-lg mt-8">
              <Image
                src={contactInfo.image.src}
                alt={contactInfo.image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint={contactInfo.image.hint}
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
