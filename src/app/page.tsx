
import AboutSection from "@/components/about-section";
import { AdBanner } from "@/components/ad-banner";
import BoardResultsSection from "@/components/board-results-section";
import ContactSection from "@/components/contact-section";
import EventsSection from "@/components/events-section";
import FaqSection from "@/components/faq-section";
import { Features } from "@/components/features";
import GallerySection from "@/components/gallery-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import TeachersSection from "@/components/teachers-section";
import TestimonialsSection from "@/components/testimonials-section";
import ToppersSection from "@/components/toppers-section";
import { getBoardStudents, getEvents, getFaqs, getGalleryItems, getSettings, getTeachers, getTestimonials, getToppers } from "@/lib/data-fetching";
import { hero } from "@/lib/data";


export default async function Home() {
  // Fetch all data on the server in parallel
  const [
    settings,
    toppers,
    boardStudents,
    teachers,
    events,
    galleryItems,
    testimonials,
    faqs
  ] = await Promise.all([
    getSettings(),
    getToppers(),
    getBoardStudents(),
    getTeachers(),
    getEvents(),
    getGalleryItems(),
    getTestimonials(),
    getFaqs()
  ]);

  const aboutContent = {
    description: settings.ourStory || "",
    imageUrl: settings.aboutImageUrl || "https://placehold.co/600x450.png",
  };

  const contactContent = {
    address: settings.contactAddress || "",
    phone: settings.contactPhone || "",
    email: settings.contactEmail || "",
    officeHours: settings.officeHours || "",
    imageUrl: settings.contactImageUrl || "https://placehold.co/600x400.png",
  };

  const heroTaglines = settings.heroTaglines ? settings.heroTaglines.split('\n').filter((line: string) => line.trim() !== '') : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero taglines={heroTaglines.length > 0 ? heroTaglines : [hero.subtitle]} />
        <Features />
        <AdBanner />
        <AboutSection content={aboutContent} />
        <ToppersSection toppers={toppers} />
        <BoardResultsSection boardStudents={boardStudents} />
        <TeachersSection teachers={teachers.slice(0, 3)} />
        <EventsSection events={events.slice(0, 3)} />
        <GallerySection galleryItems={galleryItems.slice(0, 4)} />
        <TestimonialsSection testimonials={testimonials} />
        <FaqSection faqs={faqs} />
        <ContactSection content={contactContent} />
      </main>
    </div>
  );
}
