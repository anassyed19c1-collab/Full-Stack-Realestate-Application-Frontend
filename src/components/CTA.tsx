import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-24 bg-white flex flex-col items-center justify-center text-center px-6 relative">

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
        List Your Property With Us
      </h2>

      {/* Subheading */}
      <p className="text-gray-500 mb-8 text-lg max-w-2xl">
        Reach thousands of buyers and renters instantly. Your property deserves to be seen by the right people.
      </p>

      {/* Button */}
      <Button className="bg-black text-white px-12 py-4 rounded-2xl shadow-lg hover:scale-105 hover:brightness-110 transition transform duration-300">
        Add Property
      </Button>
    </section>
  );
}