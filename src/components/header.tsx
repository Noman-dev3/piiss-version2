
"use client";

import Link from "next/link";
import { GraduationCap, Menu, Search, Home, Info, FileText, BarChart2, GalleryVertical, HelpCircle, Phone, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const navLinks = [
    { label: "Home", href: "/", icon: <Home className="w-5 h-5" /> },
    { label: "About", href: "/#about", icon: <Info className="w-5 h-5" /> },
    { label: "Admissions", href: "/admissions", icon: <FileText className="w-5 h-5" /> },
    { label: "Results", href: "/#results", icon: <BarChart2 className="w-5 h-5" /> },
    { label: "Gallery", href: "/#gallery", icon: <GalleryVertical className="w-5 h-5" /> },
    { label: "FAQ", href: "/#faq", icon: <HelpCircle className="w-5 h-5" /> },
    { label: "Contact", href: "/#contact", icon: <Phone className="w-5 h-5" /> },
  ];

  const NavLinkItems = ({ isMobile, onLinkClick }: { isMobile: boolean, onLinkClick?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onLinkClick}
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-white/10"
        >
          {isMobile && link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-md">
                <GraduationCap className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-headline">PIISS</h1>
                <p className="text-xs text-gray-300">Excellence in Education</p>
              </div>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Ask me anything..."
                className="pl-9 bg-white/10 border-gray-600 rounded-full text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-primary w-48 xl:w-64"
              />
            </div>
            <div className="lg:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[300px] bg-background/95 backdrop-blur-lg border-r border-border/60 flex flex-col">
                   <SheetHeader className="p-6 border-b border-border/60 text-left">
                     <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarImage src="https://placehold.co/80x80.png" alt="Guest User" data-ai-hint="guest user" />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-lg font-semibold text-white">Guest User</h2>
                          <p className="text-sm text-muted-foreground">Welcome to PIISS</p>
                        </div>
                      </div>
                  </SheetHeader>
                  <nav className="flex-1 p-4 space-y-2">
                    <NavLinkItems isMobile={true} onLinkClick={() => setSheetOpen(false)} />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
