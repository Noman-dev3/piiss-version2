import { Users, GraduationCap, BookOpen, Trophy } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Expert Faculty",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      title: "Holistic Learning",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Modern Curriculum",
    },
    {
      icon: <Trophy className="h-8 w-8 text-white" />,
      title: "Top Achievements",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
