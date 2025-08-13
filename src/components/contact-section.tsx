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

export default function ContactSection() {
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (event.target as HTMLFormElement).reset();
  }
  
  const contactInfo = [
    { icon: <MapPin className="w-6 h-6 text-primary" />, title: "Address", value: "123 Education Lane, Knowledge City" },
    { icon: <Phone className="w-6 h-6 text-primary" />, title: "Phone", value: "03191897942" },
    { icon: <Mail className="w-6 h-6 text-primary" />, title: "Email", value: "noman.dev3@gmail.com, admissions@piiss.edu" },
    { icon: <Clock className="w-6 h-6 text-primary" />, title: "Office Hours", value: "Monday - Friday: 8:00 AM - 5:00 PM, Saturday: 9:00 AM - 2:00 PM" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold mb-6 font-headline">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name *</Label>
                  <Input id="first-name" name="first-name" placeholder="Enter your first name" required className="bg-background/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name *</Label>
                  <Input id="last-name" name="last-name" placeholder="Enter your last name" required className="bg-background/80" />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required className="bg-background/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="Enter your phone number" className="bg-background/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select name="subject" required>
                  <SelectTrigger id="subject" className="bg-background/80">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admissions">Admissions</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="careers">Careers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" name="message" placeholder="Enter your message" rows={5} required className="bg-background/80" />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
          <div className="flex flex-col">
             <h2 className="text-4xl font-bold mb-6 font-headline">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
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
                src="https://placehold.co/600x400.png"
                alt="PIISS Campus"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="school building"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
