import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import Navbar from "@/components/Navbar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate Application",
  description: "Find your dream property",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className} suppressHydrationWarning>
        <Providers>
          <Navbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
};