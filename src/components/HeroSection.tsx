"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [tab, setTab] = useState("buy");

  return (
    <section className="relative h-[85vh] flex items-center justify-center">
      
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        className="absolute w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-5xl px-4">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Find Your Dream Property
        </h1>

        <p className="mb-6 text-gray-300 text-lg">
          Buy, Rent and Sell Properties Easily
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            variant={tab === "buy" ? "default" : "outline"}
            onClick={() => setTab("buy")}
            className={
              tab === "buy"
                ? "bg-white text-black"
                : "border-gray-500 text-gray-400 hover:bg-gray-800"
            }
          >
            Buy
          </Button>

          <Button
            variant={tab === "rent" ? "default" : "outline"}
            onClick={() => setTab("rent")}
            className={
              tab === "rent"
                ? "bg-white text-black"
                : "border-gray-500 text-gray-400 hover:bg-gray-800 hover:text-white"
            }
          >
            Rent
          </Button>
        </div>

        {/* Glass Search Box */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 grid md:grid-cols-4 gap-3 shadow-lg">
          
          <Input
            placeholder="Enter location"
            className="bg-transparent border-gray-500 text-white placeholder:text-gray-400"
          />

          <select className="bg-transparent border border-gray-500 rounded-md px-3 text-gray-300">
            <option>Property Type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Plot</option>
          </select>

          <select className="bg-transparent border border-gray-500 rounded-md px-3 text-gray-300">
            <option>Price Range</option>
            <option>0 - 5 Lac</option>
            <option>5 - 10 Lac</option>
            <option>10 Lac+</option>
          </select>

          <Button className="bg-white text-black hover:bg-gray-200">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}