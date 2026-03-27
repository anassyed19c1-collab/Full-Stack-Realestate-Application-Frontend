"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-white cursor-pointer">
          EstatePro
        </h1>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="#" className="hover:text-white">
            Buy
          </Link>
          <Link href="#" className="hover:text-white">
            Rent
          </Link>
          <Link href="#" className="hover:text-white">
            Projects
          </Link>
          <Link href="#" className="hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white text-black hover:bg-black hover:text-white"
          >
            Login
          </Button>

          <Button className="bg-white text-black hover:bg-black hover:text-white border-white">
            Post Property
          </Button>
        </div>
      </div>
    </header>
  );
}