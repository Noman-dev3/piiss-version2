
"use client";

import type { Metadata } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Preloader } from "@/app/components/preloader";
import { useState, useEffect } from "react";
import Script from "next/script";

const ptSans = PT_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ['400', '700'] 
});

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
        <title>PIISS - Pakistan Islamic International School System | Buner, Swari</title>
        <meta name="description" content="Pakistan Islamic International School System (PIISS) in Swari, Buner, offers excellence in education with a blend of academic rigor and Islamic values. Enquire about admissions today." />
        <meta name="keywords" content="PIISS, Pakistan Islamic International School System, school in Buner, school in Swari, education in Buner, PIISS admissions, Islamic school, quality education, private school Buner, Buner Swari school, admission open" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable
        )}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LCC5KL7P3Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LCC5KL7P3Q');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {loading && <Preloader />}
          <div className={cn(loading ? 'hidden' : 'block')}>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
