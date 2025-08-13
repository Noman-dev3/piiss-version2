"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  User,
  Briefcase,
  LayoutGrid,
  Mail,
  Menu,
  LogIn,
} from "lucide-react";

const navItems = [
  { href: "#home", label: "Home", icon: <Home /> },
  { href: "#about", label: "About", icon: <User /> },
  { href: "#services", label: "Services", icon: <Briefcase /> },
  { href: "#portfolio", label: "Portfolio", icon: <LayoutGrid /> },
  { href: "#contact", label: "Contact", icon: <Mail /> },
];

const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    const sections = navItems.map((item) => document.getElementById(item.href.substring(1)));
    let currentSection = "home";

    for (const section of sections) {
      if (section && section.offsetTop <= window.scrollY + window.innerHeight / 2) {
        currentSection = section.id;
      }
    }
    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex flex-col items-center p-8 border-b border-sidebar-border">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="https://placehold.co/100x100.png" alt="A-Z Piss" data-ai-hint="developer portrait" />
          <AvatarFallback>AZ</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-center text-sidebar-foreground font-headline">A-Z Piss</h2>
        <p className="text-sm text-sidebar-foreground/70">Full-Stack Developer</p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={activeSection === item.href.substring(1) ? "secondary" : "ghost"}
                className="w-full justify-start text-lg h-14"
                asChild
                onClick={onLinkClick}
              >
                <a href={item.href}>
                  <div className="mr-4">{item.icon}</div>
                  {item.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-sidebar-border">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/admin">
                <LogIn className="mr-2 h-4 w-4" /> Admin Panel
            </Link>
        </Button>
      </div>
    </div>
  );
};

export default function MainNav() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 bg-background/50 backdrop-blur-sm">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[300px] border-none">
          <NavContent onLinkClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-[300px] z-40 hidden lg:block">
      <NavContent />
    </aside>
  );
}
