
"use client";

import type { Metadata } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
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
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <title>PIISS - Pakistan Islamic International School System | Buner, Swari</title>
        <meta name="description" content="Pakistan Islamic International School System (PIISS) in Swari, Buner, offers excellence in education with a blend of academic rigor and Islamic values. Enquire about admissions today." />
        <meta name="keywords" content="PIISS, Pakistan Islamic International School System, school in Buner, school in Swari, education in Buner, PIISS admissions, Islamic school, quality education, private school Buner, Buner Swari school, admission open, school data, student results, faculty information, school events, gallery" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
         <Script
          async
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
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
