import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a183d] to-[#122b62]">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a183d] via-transparent to-transparent"></div>
        <div className="relative z-10">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Hero />
                <Features />
            </main>
        </div>
    </div>
  );
}
