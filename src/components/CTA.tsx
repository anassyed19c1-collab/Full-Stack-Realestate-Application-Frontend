"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/auth";

export default function CTA() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  const handleClick = () => {
    if (!isAuthenticated) {
      // Login nahi hai → Register pe bhejo
      router.push("/register");
    } else if (user?.role === "admin") {
      // Admin hai → Add Property pe bhejo
      router.push("/admin/properties/add");
    } else {
      // Normal user → Properties page pe bhejo
      router.push("/properties");
    }
  };

  return (
    <section className="py-24 bg-white flex flex-col items-center justify-center text-center px-6 relative">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
        List Your Property With Us
      </h2>

      {/* Subheading */}
      <p className="text-gray-500 mb-8 text-lg max-w-2xl">
        Reach thousands of buyers and renters instantly. Your property
        deserves to be seen by the right people.
      </p>

      {/* Button */}
      <Button
        onClick={handleClick}
        className="bg-black text-white px-12 py-4 rounded-2xl shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300"
      >
        {!isAuthenticated
          ? "Get Started Free"
          : user?.role === "admin"
          ? "Add Property"
          : "Browse Properties"}
      </Button>
    </section>
  );
}