import type { Metadata } from "next";
import { Inter, PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

const ptSans = PT_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ['400', '700'] 
});


export async function generateMetadata(): Promise<Metadata> {
  let logoUrl = "/favicon.ico"; // Default icon
  try {
    const settingsRef = ref(db, 'settings/logoUrl');
    const snapshot = await get(settingsRef);
    if (snapshot.exists() && snapshot.val()) {
      logoUrl = snapshot.val();
    }
  } catch (error) {
    console.error("Failed to fetch logo for metadata:", error);
  }

  return {
    title: "PIISS - Excellence in Education",
    description: "Welcome to the Future of Education",
    icons: {
      icon: logoUrl,
      shortcut: logoUrl,
      apple: logoUrl,
    },
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
