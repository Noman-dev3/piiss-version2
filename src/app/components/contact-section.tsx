"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Globe } from "lucide-react";
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
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    (event.target as HTMLFormElement).reset();
  }

  const contactInfo = [
    { icon: <Mail className="w-6 h-6 text-primary" />, title: "Email", value: "contact@revived-az.com" },
    { icon: <Globe className="w-6 h-6 text-primary" />, title: "Website", value: "revived-az.com" },
    { icon: <Phone className="w-6 h-6 text-primary" />, title: "Phone", value: "+1 234 567 890" },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Contact Me</h2>
        <Card>
          <div className="grid lg:grid-cols-3">
            <div className="lg:col-span-1 bg-gray-100/50 dark:bg-card p-8 rounded-l-lg">
              <h3 className="text-2xl font-bold mb-6 font-headline">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-background rounded-full">{item.icon}</div>
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
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Project Inquiry" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Hi there, I would like to..." rows={5} required />
                </div>
                <Button type="submit" size="lg">Send Message</Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
