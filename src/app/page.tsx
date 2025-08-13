import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import EventsSection from "@/components/events-section";
import { Features } from "@/components/features";
import GallerySection from "@/components/gallery-section";
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
        <EventsSection />
        <GallerySection />
        <ContactSection />
      </main>
    </div>
  );
}
