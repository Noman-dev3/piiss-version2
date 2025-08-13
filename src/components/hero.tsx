import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="text-center py-20 lg:py-32">
        <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm text-white mb-4">
            <span className="mr-2">✨</span>
            Welcome to the Future of Education
        </div>
      <h1 className="text-6xl lg:text-8xl font-bold text-white tracking-tight">
        PIISS
      </h1>
      <p className="text-xl lg:text-2xl text-gray-300 mt-4 mb-10">
        Excellence in Education
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-base rounded-full px-8">
          Explore Programs
        </Button>
        <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white font-bold text-base rounded-full px-8">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
