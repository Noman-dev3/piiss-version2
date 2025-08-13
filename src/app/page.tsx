import MainNav from "@/app/components/main-nav";
import HomeSection from "@/app/components/home-section";
import AboutSection from "@/app/components/about-section";
import ServicesSection from "@/app/components/services-section";
import PortfolioSection from "@/app/components/portfolio-section";
import ContactSection from "@/app/components/contact-section";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full">
      <MainNav />
      <main className="flex-1 lg:pl-[300px]">
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </div>
  );
}
