// import { Button } from "@/components/ui/button";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-black text-white py-16">
//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

//         {/* Logo & Description */}
//         <div>
//           <h1 className="text-2xl font-bold mb-4">EstatePro</h1>
//           <p className="text-gray-400">
//             Your trusted real estate platform. Buy, sell, and rent properties with ease.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="font-semibold mb-4">Quick Links</h3>
//           <ul className="space-y-2 text-gray-400">
//             <li className="hover:text-white cursor-pointer transition">Home</li>
//             <li className="hover:text-white cursor-pointer transition">Buy</li>
//             <li className="hover:text-white cursor-pointer transition">Rent</li>
//             <li className="hover:text-white cursor-pointer transition">Projects</li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h3 className="font-semibold mb-4">Contact</h3>
//           <p className="text-gray-400">info@estatepro.com</p>
//           <p className="text-gray-400">+92 300 1234567</p>
//           <p className="text-gray-400">Karachi, Pakistan</p>
//         </div>

//         {/* Social */}
//         <div>
//           <h3 className="font-semibold mb-4">Follow Us</h3>
//           <div className="flex gap-4">
//             <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black p-2 rounded-full">
//               <FaFacebookF className="w-4 h-4" />
//             </Button>

//             <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black hover:border-white p-2 rounded-full">
//               <FaTwitter className="w-4 h-4" />
//             </Button>

//             <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black p-2 rounded-full">
//               <FaInstagram className="w-4 h-4" />
//             </Button>

//             <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black p-2 rounded-full">
//               <FaLinkedinIn className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//       </div>

//       {/* Bottom Text */}
//       <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
//         &copy; {new Date().getFullYear()} EstatePro. All rights reserved.
//       </div>
//     </footer>
//   );
// }










"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold mb-4 cursor-pointer">EstatePro</h1>
          </Link>
          <p className="text-gray-400">
            Your trusted real estate platform. Buy, sell, and rent properties with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/properties?type=buy" className="hover:text-white transition">
                Buy
              </Link>
            </li>
            <li>
              <Link href="/properties?type=rent" className="hover:text-white transition">
                Rent
              </Link>
            </li>
            <li>
              <Link href="/properties" className="hover:text-white transition">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div id="contact">
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">info@estatepro.com</p>
          <p className="text-gray-400">+92 300 1234567</p>
          <p className="text-gray-400">Karachi, Pakistan</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black p-2 rounded-full">
                <FaFacebookF className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black hover:border-white p-2 rounded-full">
                <FaTwitter className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black p-2 rounded-full">
                <FaInstagram className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gray-600 text-black hover:text-white hover:bg-black p-2 rounded-full">
                <FaLinkedinIn className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} EstatePro. All rights reserved.
      </div>
    </footer>
  );
}