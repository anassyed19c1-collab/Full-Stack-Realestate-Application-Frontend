"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [tab, setTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Tab se type
    params.append("type", tab);

    // Location
    if (location.trim()) params.append("city", location);

    // Property Type
    if (propertyType) params.append("type", propertyType);

    // Price Range
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-[85vh] flex items-center justify-center">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        className="absolute w-full h-full object-cover"
        alt="Hero"
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
            placeholder="Enter city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent border-gray-500 text-white placeholder:text-gray-400"
          />

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="bg-transparent border border-gray-500 rounded-md px-3 text-gray-300"
          >
            <option value="">Property Type</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
            <option value="commercial">Commercial</option>
            <option value="plot">Plot</option>
          </select>

          <select
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              setMinPrice(min || "");
              setMaxPrice(max || "");
            }}
            className="bg-transparent border border-gray-500 rounded-md px-3 text-gray-300"
          >
            <option value="">Price Range</option>
            <option value="0-500000">0 - 5 Lac</option>
            <option value="500000-1000000">5 - 10 Lac</option>
            <option value="1000000-">10 Lac+</option>
          </select>

          <Button
            onClick={handleSearch}
            className="bg-white text-black hover:bg-gray-200"
          >
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}