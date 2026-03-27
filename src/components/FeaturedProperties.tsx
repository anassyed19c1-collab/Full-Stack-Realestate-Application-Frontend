"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { ApiResponse, Property } from "@/types";

export default function FeaturedProperties() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Property[]>>(
        "/api/properties?limit=6&status=active"
      );
      return response.data;
    },
  });

  return (
    <section className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl text-black font-bold">
            Featured Properties
          </h2>
          <Button
            variant="outline"
            onClick={() => router.push("/properties")}
            className="text-black border-black hover:bg-black hover:text-white"
          >
            View All →
          </Button>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-xl" />
            ))}
          </div>
        )}

        {/* No Properties */}
        {!isLoading && data?.data.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🏠</p>
            <p className="text-xl text-black">No properties found</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && data && data.data.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {data.data.map((property) => (
              <Card
                key={property._id}
                className="bg-black border-gray-800 overflow-hidden hover:shadow-xl transition duration-300"
              >
                {/* Image */}
                <div className="relative h-52 w-full">
                  {property.images.length > 0 ? (
                    <Image
                      src={property.images[0].url}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-52 w-full bg-gray-800 flex items-center justify-center text-gray-500">
                      🏠 No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {property.title}
                  </h3>

                  <p className="text-xl font-bold text-white mt-1">
                    PKR {property.price.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-300 mt-1">
                    📍 {property.location.city}, {property.location.province}
                    <span  className="pl-10">📐 {property.area.size} {property.area.unit}</span>
                  </p>



                  <Button
                    className="mt-4 w-full bg-white text-black hover:bg-gray-200"
                    onClick={() => router.push(`/properties/${property._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}