"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { ApiResponse, Property } from "@/types";

export default function FeaturedProjects() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Property[]>>(
        "/api/properties?limit=3&status=active"
      );
      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-28 bg-black text-white mt-0.5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-14 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="md:col-span-2 h-96 rounded-3xl bg-gray-800" />
            <div className="flex flex-col gap-8">
              <Skeleton className="h-44 rounded-2xl bg-gray-800" />
              <Skeleton className="h-44 rounded-2xl bg-gray-800" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const mainProject = data[0];
  const sideProjects = data.slice(1, 3);

  return (
    <section className="py-28 bg-black text-white mt-0.5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-14 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* BIG CARD */}
          <div
            onClick={() => router.push(`/properties/${mainProject._id}`)}
            className="md:col-span-2 relative h-[420px] rounded-3xl overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            {mainProject.images.length > 0 ? (
              <img
                src={mainProject.images[0].url}
                alt={mainProject.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-4xl">
                🏠
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Featured Badge */}
            <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </div>

            {/* Content */}
            <div className="absolute bottom-6 left-6">
              <h3 className="text-3xl font-semibold mb-1">
                {mainProject.title}
              </h3>
              <p className="text-gray-300 text-sm mb-1">
                📍 {mainProject.location.city}, {mainProject.location.province}
              </p>
              <p className="mb-4 text-white font-medium">
                PKR {mainProject.price.toLocaleString()}
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-xl hover:bg-gray-200 transition font-medium">
                View Details
              </button>
            </div>
          </div>

          {/* RIGHT SIDE SMALL CARDS */}
          <div className="flex flex-col gap-8">
            {sideProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => router.push(`/properties/${project._id}`)}
                className="relative h-[196px] rounded-2xl overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                {project.images.length > 0 ? (
                  <img
                    src={project.images[0].url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-3xl">
                    🏠
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold truncate">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    📍 {project.location.city}
                  </p>
                  <p className="text-white text-sm font-medium">
                    PKR {project.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}