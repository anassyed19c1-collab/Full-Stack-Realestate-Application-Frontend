"use client";

import { useRouter } from "next/navigation";

const areas = [
  {
    name: "DHA Karachi",
    city: "Karachi",
    desc: "Premium living with top facilities and secure environment.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    name: "Bahria Town",
    city: "Rawalpindi",
    desc: "Modern housing society with world-class infrastructure.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    name: "Clifton",
    city: "Karachi",
    desc: "Luxury coastal area with high-end apartments and views.",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
  },
  {
    name: "Gulshan-e-Iqbal",
    city: "Karachi",
    desc: "Affordable and central location with all amenities nearby.",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  },
];

export default function AreaGuides() {
  const router = useRouter();

  return (
    <section className="py-28 bg-black text-white mt-0.5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-14 text-center">
          Explore Areas
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {areas.map((area, index) => (
            <div
              key={index}
              onClick={() => router.push("/properties?city=" + area.city)}
              className="group relative h-[260px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {area.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {area.desc}
                </p>
                <button className="text-sm underline hover:text-gray-300">
                  Explore Properties →
                </button>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-white/30 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}