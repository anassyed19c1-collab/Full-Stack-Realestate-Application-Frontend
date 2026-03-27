"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuthStore from "@/lib/auth";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold text-white cursor-pointer">
            EstatePro
          </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/properties?type=buy" className="hover:text-white">
            Buy
          </Link>
          <Link href="/properties?type=rent" className="hover:text-white">
            Rent
          </Link>
          <Link href="/properties" className="hover:text-white">
            Projects
          </Link>
          <Link href="/#contact" className="hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Button
                variant="outline"
                className="border-white text-black hover:bg-black hover:text-white"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-white text-black hover:bg-black hover:text-white border-white"
                onClick={() => router.push("/register")}
              >
                Post Property
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Admin Button */}
              {user?.role === "admin" && (
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-black hover:text-white text-sm"
                  onClick={() => router.push("/admin")}
                >
                  Dashboard
                </Button>
              )}

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-white text-black text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-300 hidden md:block">
                      {user?.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile?tab=wishlist">My Wishlist</Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}