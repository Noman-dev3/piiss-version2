import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import { Features } from "@/components/features";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import PortfolioSection from "@/components/portfolio-section";
import ServicesSection from "@/components/services-section";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </div>
  );
}
