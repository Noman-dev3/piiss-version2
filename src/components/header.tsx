"use client";

import Link from "next/link";
import { GraduationCap, Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const navLinks = ["Home", "About", "Admissions", "Results", "Gallery", "FAQ", "Contact"];

  const NavLinkItems = ({ isMobile }: { isMobile: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link}
          href={`#${link.toLowerCase()}`}
          onClick={() => isMobile && setSheetOpen(false)}
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          {link}
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
          <nav className="hidden md:flex items-center gap-6">
            <NavLinkItems isMobile={false} />
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Ask me anything..."
                className="pl-9 bg-white/10 border-gray-600 rounded-full text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-primary w-48 lg:w-64"
              />
            </div>
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium mt-8">
                    <NavLinkItems isMobile={true} />
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
