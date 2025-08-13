
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { 
  LayoutGrid, UserPlus, GraduationCap, Users, FileText, Calendar, GalleryVertical, Star, MessageSquare, Megaphone, HelpCircle, LogOut 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/admin', icon: <LayoutGrid className="h-5 w-5" />, label: 'Dashboard' },
    { href: '/admin/admissions', icon: <UserPlus className="h-5 w-5" />, label: 'Admissions' },
    { href: '/admin/students', icon: <GraduationCap className="h-5 w-5" />, label: 'Students' },
    { href: '#', icon: <Users className="h-5 w-5" />, label: 'Teachers' },
    { href: '#', icon: <FileText className="h-5 w-5" />, label: 'Results' },
    { href: '#', icon: <Calendar className="h-5 w-5" />, label: 'Events' },
    { href: '#', icon: <GalleryVertical className="h-5 w-5" />, label: 'Gallery' },
    { href: '#', icon: <Star className="h-5 w-5" />, label: 'Toppers' },
    { href: '#', icon: <MessageSquare className="h-5 w-5" />, label: 'Testimonials' },
    { href: '#', icon: <Megaphone className="h-5 w-5" />, label: 'Announcements' },
    { href: '#', icon: <HelpCircle className="h-5 w-5" />, label: 'FAQ' },
];


export function AdminSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex flex-col gap-2 border-b p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="admin user"/>
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-semibold truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
                {navItems.map(item => (
                     <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                            isActive(item.href) 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
        <div className="mt-auto border-t p-4">
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
            </Button>
        </div>
    </aside>
  );
}

