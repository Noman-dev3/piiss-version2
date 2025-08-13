import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Briefcase, Headphones } from "lucide-react";

const skills = [
  { name: "HTML", value: 95 },
  { name: "CSS", value: 85 },
  { name: "JavaScript", value: 90 },
  { name: "React & Next.js", value: 92 },
  { name: "Node.js", value: 88 },
  { name: "Databases (SQL & NoSQL)", value: 85 },
];

const stats = [
  { icon: <Award className="w-8 h-8 text-primary" />, value: "5+", label: "Years Experience" },
  { icon: <Briefcase className="w-8 h-8 text-primary" />, value: "100+", label: "Completed Projects" },
  { icon: <Headphones className="w-8 h-8 text-primary" />, value: "24/7", label: "Online Support" },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 lg:px-12 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">About Me</h2>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
               <img src="https://placehold.co/400x500.png" alt="A-Z Piss" className="w-full h-auto object-cover" data-ai-hint="developer portrait" />
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  Hello! I'm a passionate Full-Stack Developer with a knack for building beautiful, functional, and user-centric web applications. With over 5 years in the industry, I've had the pleasure of working on a diverse range of projects, from small business websites to large-scale enterprise applications.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                      {stat.icon}
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-headline">My Skills</h3>
                <div className="space-y-5">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium">{skill.name}</span>
                        <span className="text-sm font-medium">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
