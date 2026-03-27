"use client";

import { useRouter } from "next/navigation";

const locations = [
  {
    name: "Karachi",
    properties: "2,300+ Properties",
    image:
      "https://images.unsplash.com/photo-1617373743747-3bb331fd4e8d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lahore",
    properties: "1,800+ Properties",
    image:
      "https://images.unsplash.com/photo-1721988277528-06a27beb1811?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Islamabad",
    properties: "1,200+ Properties",
    image:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function PopularLocations() {
  const router = useRouter();

  return (
    <section className="py-28 bg-black text-white mt-0.5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-14 text-center">
          Explore Popular Locations
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.name}
              onClick={() =>
                router.push(`/properties?city=${loc.name.toLowerCase()}`)
              }
              className="relative h-[320px] rounded-3xl overflow-hidden cursor-pointer group"
            >
              {/* Image */}
              <img
                src={loc.image}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* Glass Effect Layer */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition"></div>

              {/* Content */}
              <div className="absolute bottom-6 left-6">
                
                {/* Property Count */}
                <p className="text-sm text-gray-300 mb-1">
                  {loc.properties}
                </p>

                {/* City Name */}
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {loc.name}
                </h3>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/30 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}