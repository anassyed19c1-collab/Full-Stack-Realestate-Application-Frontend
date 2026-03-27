import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Map, Briefcase } from "lucide-react";

const categories = [
  {
    name: "Houses",
    icon: Home,
  },
  {
    name: "Apartments",
    icon: Building2,
  },
  {
    name: "Plots",
    icon: Map,
  },
  {
    name: "Commercial",
    icon: Briefcase,
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Browse By Category
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;

            return (
              <Card
                key={cat.name}
                className="
                  relative bg-white/5 border border-white/10 
                  backdrop-blur-xl 
                  hover:scale-105 hover:bg-white/10 
                  transition duration-300 cursor-pointer
                  rounded-2xl
                "
              >
                <CardContent className="flex flex-col items-center justify-center p-10">
                  
                  {/* Icon */}
                  <div className="bg-white/10 p-4 rounded-xl mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg text-white font-semibold tracking-wide">
                    {cat.name}
                  </h3>

                  {/* Subtle line */}
                  <div className="w-10 h-0.5 bg-white/30 mt-3"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}