import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Smartphone, PenTool, BarChart, Annoyed, ShoppingCart } from "lucide-react";

const services = [
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: "Web Development",
    description: "Creating responsive, high-performance websites and web applications tailored to your business needs."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "App Development",
    description: "Building intuitive and feature-rich mobile applications for both iOS and Android platforms."
  },
  {
    icon: <PenTool className="w-10 h-10 text-primary" />,
    title: "UI/UX Design",
    description: "Designing beautiful, user-friendly interfaces that enhance user engagement and satisfaction."
  },
   {
    icon: <ShoppingCart className="w-10 h-10 text-primary" />,
    title: "E-commerce Solutions",
    description: "Developing robust e-commerce platforms with secure payment gateways and seamless user experience."
  },
  {
    icon: <BarChart className="w-10 h-10 text-primary" />,
    title: "SEO Optimization",
    description: "Improving your website's visibility on search engines to attract more organic traffic."
  },
  {
    icon: <Annoyed className="w-10 h-10 text-primary" />,
    title: "Consulting",
    description: "Providing expert advice and strategy to help you achieve your digital goals."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="px-6 lg:px-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-secondary">
              <CardHeader>
                <div className="mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
