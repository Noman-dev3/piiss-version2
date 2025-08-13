import Link from "next/link";
import { GraduationCap, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
  const navLinks = ["Home", "About", "Admissions", "Results", "FAQ", "Contact"];

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-md">
              <GraduationCap className="h-6 w-6 text-blue-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PIISS</h1>
              <p className="text-xs text-gray-300">Excellence in Education</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 ml-10">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Ask me anything..." className="pl-9 bg-white/10 border-gray-600 rounded-full text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-primary w-64" />
            </div>
        </div>
      </div>
    </header>
  );
}
