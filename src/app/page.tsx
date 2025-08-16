

import AboutSection from "@/components/about-section";
import { AdBanner } from "@/components/ad-banner";
import { BackToTopButton } from "@/components/back-to-top-button";
import BoardResultsSection from "@/components/board-results-section";
import ContactSection from "@/components/contact-section";
import EventsSection from "@/components/events-section";
import FaqSection from "@/components/faq-section";
import { Features } from "@/components/features";
import Footer from "@/components/footer";
import GallerySection from "@/components/gallery-section";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import LazyLoad from "@/components/lazy-load";
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

  const footerContent = {
      facebookUrl: settings.facebookUrl,
      instagramUrl: settings.instagramUrl,
      linkedinUrl: settings.linkedinUrl,
      twitterUrl: settings.twitterUrl,
  }

  const heroTaglines = Array.isArray(settings.heroTaglines) && settings.heroTaglines.length > 0 
    ? settings.heroTaglines 
    : [hero.subtitle];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <main className="flex-1">
          <Hero taglines={heroTaglines} />
          <Features />
          <AdBanner />
          <LazyLoad>
            <AboutSection content={aboutContent} />
          </LazyLoad>
          <LazyLoad>
            <ToppersSection toppers={toppers} />
          </LazyLoad>
          <LazyLoad>
            <BoardResultsSection boardStudents={boardStudents} />
          </LazyLoad>
          <LazyLoad>
            <TeachersSection teachers={teachers.slice(0, 3)} />
          </LazyLoad>
          <LazyLoad>
            <EventsSection events={events.slice(0, 3)} />
          </LazyLoad>
          <LazyLoad>
            <GallerySection galleryItems={galleryItems.slice(0, 4)} />
          </LazyLoad>
          <LazyLoad>
            <TestimonialsSection testimonials={testimonials} />
          </LazyLoad>
          <LazyLoad>
            <FaqSection faqs={faqs} settings={settings} />
          </LazyLoad>
          <LazyLoad>
            <ContactSection content={contactContent} />
          </LazyLoad>
        </main>
      </div>
      <Footer content={footerContent} />
      <BackToTopButton />
    </div>
  );
}
