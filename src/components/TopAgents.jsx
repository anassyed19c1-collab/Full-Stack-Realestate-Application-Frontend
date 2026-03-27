"use client";

import { Button } from "@/components/ui/button";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const agents = [
  {
    id: 1,
    name: "Ali Khan",
    agency: "ABC Real Estate",
    experience: "5 Years",
    listings: "120 Listings",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    agency: "Prime Properties",
    experience: "3 Years",
    listings: "85 Listings",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 3,
    name: "Usman Sheikh",
    agency: "Elite Estate",
    experience: "7 Years",
    listings: "200 Listings",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 4,
    name: "Ayesha Noor",
    agency: "Urban Properties",
    experience: "6 Years",
    listings: "150 Listings",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
  },
];

export default function TopAgents() {
  return (
    <section className="py-28 bg-black text-white mt-0.5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-14 text-center">
          Top Real Estate Agents
        </h2>

        {/* Grid (4 in one row) */}
        <div className="grid md:grid-cols-4 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="
                relative p-6 rounded-3xl text-center
                bg-white/10 backdrop-blur-2xl 
                border border-white/20
                hover:bg-white/15 hover:scale-105
                transition duration-300 group
              "
            >
              {/* Glass glow border */}
              <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/40 transition"></div>

              {/* Image */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={agent.image}
                  className="w-full h-full rounded-full object-cover border border-white/30"
                />

                {/* Verified Badge */}
                <span className="absolute bottom-0 right-0 bg-white text-black text-xs px-2 py-[2px] rounded-full">
                  ✔
                </span>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold">
                {agent.name}
              </h3>

              {/* Agency */}
              <p className="text-gray-400 text-sm">
                {agent.agency}
              </p>

              {/* Info */}
              <div className="flex justify-center gap-2 mt-2 text-xs text-gray-300">
                <span>{agent.experience}</span>
                <span>•</span>
                <span>{agent.listings}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-2 mt-4">
                <Button size="sm" className="bg-white text-black hover:bg-gray-200 flex items-center gap-1">
                  <FaEnvelope />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:text-white hover:border-white flex items-center gap-1"
                >
                  <FaWhatsapp />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}