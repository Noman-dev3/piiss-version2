import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import TypingAnimation from "./typing-animation";

const socialLinks = [
  { icon: <Twitter />, href: "#" },
  { icon: <Facebook />, href: "#" },
  { icon: <Instagram />, href: "#" },
  { icon: <Linkedin />, href: "#" },
];

export default function HomeSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center p-6 bg-cover bg-center" style={{backgroundImage: "url('/background.jpg')"}}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col items-center">
        <Avatar className="w-40 h-40 mb-6 border-4 border-primary shadow-lg">
          <AvatarImage src="https://placehold.co/160x160.png" alt="A-Z Piss" data-ai-hint="developer portrait" />
          <AvatarFallback>AZ</AvatarFallback>
        </Avatar>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 font-headline">A-Z Piss</h1>
        <div className="text-2xl md:text-3xl font-medium text-primary mb-6 h-10">
          <TypingAnimation titles={["I'm a Full-Stack Developer", "I'm a Freelancer", "I'm a UI/UX Designer"]} />
        </div>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
          Crafting digital experiences from concept to reality. Welcome to my corner of the web.
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Button key={index} variant="outline" size="icon" asChild>
              <a href={link.href} aria-label={`Social link ${index + 1}`}>{link.icon}</a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
