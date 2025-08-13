"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Globe, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    
    // Mock submission
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    (event.target as HTMLFormElement).reset();
  }

  const contactInfo = [
    { icon: <Mail className="w-6 h-6 text-primary" />, title: "Email", value: "contact@piiss.edu" },
    { icon: <Globe className="w-6 h-6 text-primary" />, title: "Website", value: "piiss.edu" },
    { icon: <Phone className="w-6 h-6 text-primary" />, title: "Phone", value: "+92 123 4567890" },
  ];

  return (
    <section id="contact" className="px-6 lg:px-12 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Contact Us</h2>
        <Card>
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-1 bg-background/50 p-8 rounded-l-lg">
              <h3 className="text-2xl font-bold mb-6 font-headline">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-secondary rounded-full">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 p-8">
              <h3 className="text-2xl font-bold mb-6 font-headline">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required className="bg-background"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required className="bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="General Inquiry" required className="bg-background"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Hi there, I would like to..." rows={5} required className="bg-background"/>
                </div>
                <Button type="submit" size="lg">
                    <Send className="mr-2 h-4 w-4"/>
                    Send Message
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}