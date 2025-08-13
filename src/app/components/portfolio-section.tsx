import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Link2 } from 'lucide-react';

const projects = [
  {
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    hint: 'online store'
  },
  {
    title: 'Mobile Banking App',
    category: 'App Development',
    image: 'https://placehold.co/600x400.png',
    hint: 'finance app'
  },
  {
    title: 'Corporate Branding',
    category: 'Branding',
    image: 'https://placehold.co/600x400.png',
    hint: 'company logo'
  },
  {
    title: 'SaaS Dashboard',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    hint: 'analytics dashboard'
  },
  {
    title: 'Fitness Tracker App',
    category: 'App Development',
    image: 'https://placehold.co/600x400.png',
    hint: 'running workout'
  },
  {
    title: 'Restaurant Website',
    category: 'Web Development',
    image: 'https://placehold.co/600x400.png',
    hint: 'modern restaurant'
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group relative">
              <CardContent className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.hint}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                  <a href="#" className="p-4 bg-primary rounded-full mb-4 text-primary-foreground hover:bg-primary/80 transition-colors">
                    <Link2 className="w-6 h-6" />
                  </a>
                  <h3 className="text-xl font-bold text-white font-headline">{project.title}</h3>
                  <p className="text-white/80">{project.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
