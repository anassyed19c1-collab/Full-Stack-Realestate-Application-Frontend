// "use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/api";
// import PropertyCard from "@/components/PropertyCard";

// export default function HomePage() {
//   const [search, setSearch] = useState("");

//   const { data, isLoading } = useQuery({
//     queryKey: ["properties"],
//     queryFn: async () => {
//       const res = await api.get("/properties");
//       return res.data;
//     },
//   });

//   const filteredProperties = data?.filter((property: any) =>
//     property.title.toLowerCase().includes(search.toLowerCase()) ||
//     property.location.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen">

//       {/* HERO */}
//       <div className="bg-gray-100 py-20 text-center px-4">
//         <h1 className="text-5xl font-bold">
//           Find Your Dream Home 🏡
//         </h1>
//         <p className="text-gray-600 mt-4">
//           Buy, Sell & Rent properties easily
//         </p>

//         <div className="mt-6 max-w-xl mx-auto">
//           <input
//             type="text"
//             placeholder="Search by location or title..."
//             className="w-full border p-3 rounded-lg"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* FEATURED */}
//       <div className="p-6 max-w-6xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6">
//           Featured Properties
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {filteredProperties?.slice(0, 3).map((property: any) => (
//             <PropertyCard key={property._id} property={property} />
//           ))}
//         </div>
//       </div>

//       {/* LATEST PROPERTIES */}
//       <div className="p-6 max-w-6xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6">
//           Latest Properties
//         </h2>

//         {isLoading ? (
//           <p>Loading...</p>
//         ) : filteredProperties?.length === 0 ? (
//           <p>No properties found</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {filteredProperties?.map((property: any) => (
//               <PropertyCard key={property._id} property={property} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* WHY CHOOSE US */}
//       <div className="bg-gray-100 py-16 px-6 text-center">
//         <h2 className="text-3xl font-bold mb-10">
//           Why Choose Us?
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//           <div className="p-6 border rounded">
//             <h3 className="font-bold text-lg">Trusted Agents</h3>
//             <p className="text-gray-500 mt-2">
//               Verified agents for secure deals
//             </p>
//           </div>

//           <div className="p-6 border rounded">
//             <h3 className="font-bold text-lg">Best Prices</h3>
//             <p className="text-gray-500 mt-2">
//               Affordable and competitive pricing
//             </p>
//           </div>

//           <div className="p-6 border rounded">
//             <h3 className="font-bold text-lg">24/7 Support</h3>
//             <p className="text-gray-500 mt-2">
//               We are here to help anytime
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="bg-black text-white text-center py-16">
//         <h2 className="text-3xl font-bold">
//           Ready to Find Your Dream Home?
//         </h2>
//         <p className="mt-4">
//           Join now and explore the best properties
//         </p>

//         <button className="mt-6 bg-white text-black px-6 py-3 rounded">
//           Get Started
//         </button>
//       </div>

//       {/* FOOTER */}
//       <div className="bg-gray-900 text-white text-center py-6">
//         <p>© 2026 Real Estate App. All rights reserved.</p>
//       </div>

//     </div>
//   );
// }















import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturedProperties />
      <Categories />  
      <CTA />
      <Footer />
    </>
  );
}