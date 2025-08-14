
"use client";

import type { Metadata } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/components/preloader";
import { useState, useEffect } from "react";

const ptSans = PT_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ['400', '700'] 
});

// export const metadata: Metadata = {
//   title: "PIISS - Excellence in Education",
//   description: "Welcome to the Future of Education",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/favicon.ico",
//   },
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);


  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <title>PIISS - Excellence in Education</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {loading ? <Preloader /> : children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
