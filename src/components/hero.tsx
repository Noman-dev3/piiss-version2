import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="home" className="relative text-center py-20 lg:py-32 bg-gradient-to-br from-[#0a183d] to-[#122b62]">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white mb-4">
                <span className="mr-2">✨</span>
                Welcome to the Future of Education
            </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight font-headline">
            PIISS
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mt-4 mb-10 max-w-3xl mx-auto">
            Excellence in Education
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-base rounded-full px-8">
              Explore Programs
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold text-base rounded-full px-8">
              Contact Us
            </Button>
          </div>
        </div>
    </section>
  );
}
