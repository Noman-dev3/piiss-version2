import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import { Features } from "@/components/features";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import TeachersSection from "@/components/teachers-section";
import ToppersSection from "@/components/toppers-section";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <AboutSection />
        <ToppersSection />
        <TeachersSection />
        <ContactSection />
      </main>
    </div>
  );
}
