
"use client";

import Link from "next/link";
import { GraduationCap, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks, header } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import Image from "next/image";
import { AISearchDialog } from "./ai-search-dialog";
import { FAQ, Teacher, Event, Topper, BoardStudent } from "@/app/admin/data-schemas";

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  
  const [siteData, setSiteData] = useState({
    settings: {},
    faqs: [] as FAQ[],
    teachers: [] as Teacher[],
    events: [] as Event[],
    toppers: [] as Topper[],
    boardStudents: [] as BoardStudent[],
  });

  useEffect(() => {
    const settingsRef = ref(db, 'settings');
    const faqsRef = ref(db, 'faqs');
    const teachersRef = ref(db, 'teachers');
    const eventsRef = ref(db, 'events');
    const toppersRef = ref(db, 'toppers');
    const boardStudentsRef = ref(db, 'boardStudents');

    const onSettingsValue = onValue(settingsRef, (snapshot) => {
        const data = snapshot.val();
        setLogoUrl(data?.logoUrl || "");
        setSiteData(prev => ({ ...prev, settings: data || {} }));
    });
    const onFaqsValue = onValue(faqsRef, (snapshot) => setSiteData(prev => ({ ...prev, faqs: Object.values(snapshot.val() || {}) })));
    const onTeachersValue = onValue(teachersRef, (snapshot) => setSiteData(prev => ({ ...prev, teachers: Object.values(snapshot.val() || {}) })));
    const onEventsValue = onValue(eventsRef, (snapshot) => setSiteData(prev => ({ ...prev, events: Object.values(snapshot.val() || {}) })));
    const onToppersValue = onValue(toppersRef, (snapshot) => setSiteData(prev => ({ ...prev, toppers: Object.values(snapshot.val() || {}) })));
    const onBoardStudentsValue = onValue(boardStudentsRef, (snapshot) => setSiteData(prev => ({ ...prev, boardStudents: Object.values(snapshot.val() || {}) })));


    return () => {
      onSettingsValue();
      onFaqsValue();
      onTeachersValue();
      onEventsValue();
      onToppersValue();
      onBoardStudentsValue();
    };
  }, []);

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-md">
                {logoUrl ? (
                    <Image src={logoUrl} alt="PIISS Logo" width={24} height={24} className="text-primary-foreground" />
                ) : (
                    <GraduationCap className="h-6 w-6 text-primary-foreground" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-headline">{header.logo.title}</h1>
                <p className="text-xs text-muted-foreground">{header.logo.description}</p>
              </div>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>

            <ThemeToggle />
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
                          <AvatarImage src={header.mobileMenu.user.avatar.src} alt={header.mobileMenu.user.avatar.alt} data-ai-hint={header.mobileMenu.user.avatar.hint} />
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-lg font-semibold text-foreground">{header.mobileMenu.user.name}</h2>
                          <p className="text-sm text-muted-foreground">{header.mobileMenu.user.welcomeMessage}</p>
                        </div>
                      </div>
                  </SheetHeader>
                  <nav className="flex-1 p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setSheetOpen(false)}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-accent"
                        >
                        {link.icon}
                        <span>{link.label}</span>
                        </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
    <AISearchDialog 
      isOpen={isSearchOpen} 
      onOpenChange={setSearchOpen}
      siteData={siteData}
    />
    </>
  );
}
