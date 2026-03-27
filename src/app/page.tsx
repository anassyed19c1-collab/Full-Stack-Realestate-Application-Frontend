'use client'

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import Categories from "@/components/Categories";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import PopularLocations from "@/components/PopularLocations";
import FeaturedProjects from "@/components/FeaturedProjects";
import TopAgents from "@/components/TopAgents";
import AreaGuides from "@/components/AreaGuides";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturedProperties />
      <Categories />
      <PopularLocations />
      <FeaturedProjects />
      <TopAgents />
      <AreaGuides />
      <CTA />
      <Footer />
    </>
  );
}